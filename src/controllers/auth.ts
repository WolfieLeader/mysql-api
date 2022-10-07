import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import pool from "../config/sql/pool";
import CError from "../error/CError";
import {
  validateAuthorization,
  validateDecoded,
  validateEmail,
  validateName,
  validatePassword,
  validateToken,
} from "../functions/validate";
import { compareSalt, hashIt } from "../functions/encrypt";
import { isEmailTaken, isNameTaken } from "../functions/query";
import { IUserSQL } from "../models/user.d";
import { secretKey } from "../config/secretKey";
import User from "../models/userModel";

/**Creating a new user */
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  if (await isEmailTaken(email)) throw new CError("Email already taken", 409);
  if (await isNameTaken(name)) throw new CError("Name already taken", 409);
  const newUser = new User({ name, email, password });
  await pool.execute(`INSERT INTO users(id,name,email,password,networth,hobbies) VALUES ${newUser.stringIt()}`);
  res.status(201).json({ message: "User created" });
};

/**Logging in existing user */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  validateEmail(email);
  validatePassword(password);
  const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email.toLowerCase().trim()]);
  if (!Array.isArray(user) || user.length === 0) throw new CError("User not found", 404);
  const [userObj] = user as IUserSQL[];
  if (!compareSalt(userObj.password, password)) throw new CError("Wrong Password", 401);
  const jwtKey = hashIt(secretKey);
  const token = jsonwebtoken.sign({ userId: userObj.id }, jwtKey, { expiresIn: "5m" });
  res.status(200).json({ token: token });
};

/**Authorizing the user */
export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  validateAuthorization(authorization);
  const authorizationStr = authorization as string;
  const token = authorizationStr.split(" ")[1];
  validateToken(token);
  const jwtKey = hashIt(secretKey);
  const decoded = jsonwebtoken.verify(token, jwtKey);
  validateDecoded(decoded);
  const { userId } = decoded as { userId: string };
  res.locals.userId = userId;
  next();
};
