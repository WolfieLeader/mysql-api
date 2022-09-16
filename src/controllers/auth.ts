import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import pool from "../config/sql/pool";
import handleError from "../config/error/handleError";
import CError from "../config/error/CError";
import { validateDecoded, validateEmail, validateName, validatePassword, validateToken } from "../functions/validate";
import { compareSalt, hashIt, saltIt } from "../functions/encrypt";
import { isEmailTaken } from "../functions/query";
import { UserSQL } from "../config/setup/users";
import { secretKey } from "../config/secretKey";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (validateName(name) && validateEmail(email) && validatePassword(password)) {
      const isTaken = await isEmailTaken(email);
      if (isTaken) throw new CError("Email already taken", 409);
      await pool.execute("INSERT INTO users(name,email,password) VALUES(?,?,?)", [name, email, saltIt(password)]);
      res.status(201).json({ message: "User created" });
    }
    throw new CError("Invalid data", 400);
  } catch (err) {
    const error = handleError(err);
    res.status(error.status).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (validateEmail(email) && validatePassword(password)) {
      const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]);
      if (Array.isArray(user) && user.length > 0) {
        const [userObj] = user as UserSQL[];
        const comparedPasswords = compareSalt(userObj.password, password);
        if (!comparedPasswords) throw new CError("Invalid password", 401);
        const jwtKey = hashIt(secretKey);
        const token = jsonwebtoken.sign({ id: userObj.id }, jwtKey, { expiresIn: "5m" });
        res.status(200).json({ token });
      }
    }
    throw new CError("Invalid data", 400);
  } catch (err) {
    const error = handleError(err);
    res.status(error.status).json({ error: error.message });
  }
};

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    if (validateToken(token)) {
      const jwtKey = hashIt(secretKey);
      const decoded = jsonwebtoken.verify(token, jwtKey);
      if (validateDecoded(decoded)) {
        const { id } = decoded as { id: number };
        req.body.id = id;
        next();
      }
    }
    throw new CError("Invalid token", 401);
  } catch (err) {
    const error = handleError(err);
    res.status(error.status).json({ error: error.message });
  }
};
