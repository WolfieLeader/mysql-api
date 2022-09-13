import { Request, Response, NextFunction } from "express";
import mysql from "mysql2/promise";
import jsonwebtoken from "jsonwebtoken";
import {
  connectionSettings,
  handleError,
  hashIt,
  hasLettersDigitsSpacesOnly,
  validateEmail,
  secretKey,
  formatStringToNumber,
} from "../helpers";
import { UserSQL, CError } from "../interfaces";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw { errMessage: "Missing params", errStatus: 400 } as CError;
    }
    if (typeof token !== "string") {
      throw { errMessage: "Invalid params", errStatus: 400 } as CError;
    }
    const jwtKey = hashIt(secretKey);
    const decoded = jsonwebtoken.verify(token, jwtKey);
    if (!decoded || typeof decoded !== "object" || !decoded.id || typeof decoded.id !== "number") {
      throw { errMessage: "Invalid token", errStatus: 401 } as CError;
    }
    res.locals.id = decoded.id;
    next();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};

export const changeName = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals;
    const { name } = req.body;
    if (!id) {
      throw { errMessage: "Invalid token id", errStatus: 400 } as CError;
    }
    if (!name) {
      throw { errMessage: "Missing params", errStatus: 400 } as CError;
    }
    if (typeof name !== "string" || typeof id !== "number") {
      throw { errMessage: "Invalid params", errStatus: 400 } as CError;
    }
    if (name.length < 4 || name.length > 20) {
      throw { errMessage: "Name must be between 4-20 characters", errStatus: 400 } as CError;
    }
    if (!hasLettersDigitsSpacesOnly(name)) {
      throw { errMessage: "Name must contain only english letters, numbers and spaces", errStatus: 400 } as CError;
    }
    const connection = await mysql.createConnection(connectionSettings);
    await connection.execute(`UPDATE users SET name = '${name}' WHERE id = ${id};`);
    const [userSQL] = await connection.execute(`SELECT * FROM users WHERE id = ${id};`);
    if (!Array.isArray(userSQL) || userSQL.length === 0) {
      await connection.end();
      throw { errMessage: "User not found", errStatus: 404 } as CError;
    }
    const [userObj] = userSQL as UserSQL[];
    res.status(200).json({ user: userObj });
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};

export const changeEmail = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals;
    const { email } = req.body;
    if (!id) {
      throw { errMessage: "Invalid token id", errStatus: 400 } as CError;
    }
    if (!email) {
      throw { errMessage: "Missing params", errStatus: 400 } as CError;
    }
    if (typeof email !== "string" || typeof id !== "number") {
      throw { errMessage: "Invalid params", errStatus: 400 } as CError;
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
    await connection.execute(`UPDATE users SET email = '${email.toLowerCase()}' WHERE id = ${id};`);
    const [userSQL] = await connection.execute(`SELECT * FROM users WHERE id = ${id};`);
    if (!Array.isArray(userSQL) || userSQL.length === 0) {
      await connection.end();
      throw { errMessage: "User not found", errStatus: 404 } as CError;
    }
    const [userObj] = userSQL as UserSQL[];
    res.status(200).json({ user: userObj });
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};

export const changeHobbies = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals;
    const { hobbies } = req.body;
    if (!id) {
      throw { errMessage: "Invalid token id", errStatus: 400 } as CError;
    }
    if (!hobbies) {
      throw { errMessage: "Missing params", errStatus: 400 } as CError;
    }
    if (!Array.isArray(hobbies) || typeof id !== "number") {
      throw { errMessage: "Invalid params", errStatus: 400 } as CError;
    }
    if (hobbies.length > 10) {
      throw { errMessage: "You can have up to 10 hobbies", errStatus: 400 } as CError;
    }
    hobbies.forEach((hobby) => {
      if (typeof hobby !== "string") {
        throw { errMessage: "Invalid params", errStatus: 400 } as CError;
      }
      if (hobby.length > 30) {
        throw { errMessage: "Hobby must be less than 30 characters", errStatus: 400 } as CError;
      }
      if (!hasLettersDigitsSpacesOnly(hobby)) {
        throw { errMessage: "Hobby must contain only english letters, numbers and spaces", errStatus: 400 } as CError;
      }
    });

    const connection = await mysql.createConnection(connectionSettings);
    await connection.execute(`UPDATE users SET hobbies = '${JSON.stringify(hobbies)}' WHERE id = ${id};`);
    const [userSQL] = await connection.execute(`SELECT * FROM users WHERE id = ${id};`);
    if (!Array.isArray(userSQL) || userSQL.length === 0) {
      await connection.end();
      throw { errMessage: "User not found", errStatus: 404 } as CError;
    }
    const [userObj] = userSQL as UserSQL[];
    res.status(200).json({ user: userObj });
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};

export const changeNetWorth = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals;
    const { netWorth } = req.body;
    if (!id) {
      throw { errMessage: "Invalid token id", errStatus: 400 } as CError;
    }
    if (!netWorth) {
      throw { errMessage: "Missing params", errStatus: 400 } as CError;
    }
    if (typeof netWorth !== "string" || typeof id !== "number") {
      throw { errMessage: "Invalid params", errStatus: 400 } as CError;
    }
    const netWorthNumber = formatStringToNumber(netWorth);
    if (netWorthNumber === -1) {
      throw { errMessage: "Invalid net worth", errStatus: 400 } as CError;
    }
    if (netWorthNumber < 0) {
      throw { errMessage: "Net worth must be positive", errStatus: 400 } as CError;
    }
    const connection = await mysql.createConnection(connectionSettings);
    await connection.execute(`UPDATE users SET netWorth = ${netWorthNumber} WHERE id = ${id};`);
    const [userSQL] = await connection.execute(`SELECT * FROM users WHERE id = ${id};`);
    if (!Array.isArray(userSQL) || userSQL.length === 0) {
      await connection.end();
      throw { errMessage: "User not found", errStatus: 404 } as CError;
    }
    const [userObj] = userSQL as UserSQL[];
    res.status(200).json({ user: userObj });
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};
