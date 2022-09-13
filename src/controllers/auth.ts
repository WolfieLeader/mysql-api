import { Request, Response } from "express";
import mysql from "mysql2/promise";
import jsonwebtoken from "jsonwebtoken";
import {
  connectionSettings,
  secretKey,
  handleError,
  saltIt,
  compareSalt,
  hashIt,
  validateEmail,
  hasLettersDigitsSpacesOnly,
} from "../helpers";
import { CError, UserSQL } from "../interfaces";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw { errMessage: "Missing params", errStatus: 400 } as CError;
    }
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      throw { errMessage: "Invalid params", errStatus: 400 } as CError;
    }
    if (name.length < 4 || name.length > 20) {
      throw { errMessage: "Name must be between 4-20 characters", errStatus: 400 } as CError;
    }
    if (!hasLettersDigitsSpacesOnly(name)) {
      throw { errMessage: "Name must contain only english letters, numbers and spaces", errStatus: 400 } as CError;
    }
    if (password.length < 8 || password.length > 20) {
      throw { errMessage: "Password must be between 8-20 characters", errStatus: 400 } as CError;
    }
    if (!validateEmail(email)) {
      throw { errMessage: "Invalid email", errStatus: 400 } as CError;
    }

    const connection = await mysql.createConnection(connectionSettings);
    const [takenEmail] = await connection.execute("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]);
    if (Array.isArray(takenEmail) && takenEmail.length > 0) {
      await connection.end();
      throw { errMessage: "Email already taken", errStatus: 409 } as CError;
    }
    await connection.execute(
      `INSERT INTO users(name,email,password,realPassword) 
      VALUES ('${name}','${email.toLowerCase()}','${saltIt(password)}','${password}');`
    );
    res.status(201).json({ message: "User created" });
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { errMessage: "Missing params", errStatus: 400 } as CError;
    }
    if (typeof email !== "string" || typeof password !== "string") {
      throw { errMessage: "Invalid params", errStatus: 400 } as CError;
    }
    if (!validateEmail(email)) {
      throw { errMessage: "Invalid email", errStatus: 400 } as CError;
    }
    const connection = await mysql.createConnection(connectionSettings);
    const [userResult] = await connection.execute("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]);
    if (!Array.isArray(userResult)) {
      await connection.end();
      throw { errMessage: "Invalid email or password", errStatus: 400 } as CError;
    }
    if (Array.isArray(userResult) && userResult.length === 0) {
      await connection.end();
      throw { errMessage: "Invalid email or password", errStatus: 404 } as CError;
    }
    const [user] = userResult as UserSQL[];

    if (!compareSalt(user.password, password)) {
      await connection.end();
      throw { errMessage: "Invalid email or password", errStatus: 400 } as CError;
    }
    const jwtKey = hashIt(secretKey);
    const token = jsonwebtoken.sign({ id: user.id }, jwtKey, { expiresIn: "5m" });
    res.status(200).json({ token: token });
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};
