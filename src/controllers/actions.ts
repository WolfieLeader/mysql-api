import { Request, Response } from "express";
import CError from "../error/CError";
import pool from "../config/sql/pool";
import { isEmailTaken, isNameTaken } from "../functions/query";
import {
  validateEmail,
  validateName,
  validateId,
  validateHobbies,
  validateFoundedAt,
  validateCompanyName,
} from "../functions/validate";
import { isValidNumber, isValidString } from "../functions/confirm";
import { stringToBigNumber } from "../functions/format";

/**Changing the user's name*/
export const changeName = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { name } = req.body;
  validateId(userId);
  validateName(name);
  if (await isNameTaken(name)) throw new CError("Name already taken", 409);
  await pool.execute("UPDATE users SET name = ? WHERE id = ?", [name, userId]);
  res.status(200).json({ message: "Name changed successfully", name: name });
};

/**Changing the user's email*/
export const changeEmail = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { email } = req.body;
  validateId(userId);
  validateEmail(email);
  const isTaken = await isEmailTaken(email.toLowerCase());
  if (isTaken) throw new CError("Email already taken", 409);
  await pool.execute("UPDATE users SET email = ? WHERE id = ?", [email.toLowerCase(), userId]);
  res.status(200).json({ message: "Email changed successfully", email: email });
};

/**Changing the user's networth*/
export const changeNetworth = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { networth } = req.body;
  validateId(userId);
  isValidString(networth);
  const networthNum = stringToBigNumber(networth);
  isValidNumber(networthNum);
  await pool.execute("UPDATE users SET networth = ? WHERE id = ?", [networthNum, userId]);
  res.status(200).json({ message: "Networth changed successfully", networth: networthNum });
};

/**Changing the user's hobbies*/
export const changeHobbies = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { hobbies } = req.body;
  validateId(userId);
  validateHobbies(hobbies);
  await pool.execute("UPDATE users SET hobbies = ? WHERE id = ?", [hobbies, userId]);
  res.status(200).json({ message: "Hobbies changed successfully", hobbies: hobbies });
};

/**Creating a new company*/
export const createCompany = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { name, foundedAt } = req.body;
  validateId(userId);
  validateFoundedAt(foundedAt);
  validateCompanyName(name);
  console.log(userId, name, foundedAt);
  await pool.execute("INSERT INTO companies (name, foundedAt, founderId) VALUES (?, ?, ?)", [name, foundedAt, userId]);
  res.status(201).json({ message: "Company created successfully", name: name, foundedAt: foundedAt });
};

/**Changing the company's name*/
export const changeCompanyName = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { pre, name } = req.body;
  validateId(userId);
  validateCompanyName(pre);
  validateCompanyName(name);
  const [company] = await pool.execute("SELECT id FROM companies WHERE name = ? AND founderId = ?", [pre, userId]);
  if (!company || !Array.isArray(company) || company.length === 0) throw new CError("Company not found", 404);
  const [companyObj] = company as { id: number }[];
  await pool.execute("UPDATE companies SET name = ? WHERE id = ?", [name, companyObj.id]);
  res.status(200).json({ message: "Company name changed successfully", name: name });
};
