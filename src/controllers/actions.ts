import { Request, Response } from "express";
import CError from "../error/CError";
import pool from "../config/sql/pool";
import { isCompanyNameTaken, isEmailTaken, isNameTaken } from "../functions/query";
import {
  validateEmail,
  validateName,
  validateId,
  validateHobbies,
  validateYear,
  validateCompanyName,
  validatePassword,
} from "../functions/validate";
import { isValidNumber, isValidString } from "../functions/confirm";
import { stringToBigNumber } from "../functions/format";
import { IUserSQL } from "../models/user";
import { compareSalt } from "../functions/encrypt";
import Company from "../models/companyModel";
import { ICompanySQL } from "../models/company";

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
  if (await isEmailTaken(email.toLowerCase())) throw new CError("Email already taken", 409);
  await pool.execute("UPDATE users SET email = ? WHERE id = ?", [email.toLowerCase(), userId]);
  res.status(200).json({ message: "Email changed successfully", email: email });
};

/**Changing the user's password */
export const changePassword = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { last, password } = req.body;
  validateId(userId);
  validatePassword(last);
  validatePassword(password);
  const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);
  if (!Array.isArray(user) || user.length === 0) throw new CError("User not found", 404);
  const [userObj] = user as IUserSQL[];
  if (!compareSalt(userObj.password, last)) throw new CError("Wrong Password", 401);
  await pool.execute("UPDATE users SET password = ? WHERE id = ?", [password, userId]);
  res.status(200).json({ message: "Password changed successfully" });
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
  const { name } = req.body;
  validateId(userId);
  validateCompanyName(name);
  if (await isCompanyNameTaken(name)) throw new CError("Company name already taken", 409);
  const newCompany = new Company({ name: name, founders: [userId] });
  await pool.execute(`INSERT INTO companies (id,name,founders,year) VALUES ${newCompany.stringIt()};`);
  res.status(201).json({ message: "Company created successfully", name: name });
};

/**Changing the company's name*/
export const changeCompanyName = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { last, name } = req.body;
  validateId(userId);
  validateCompanyName(last);
  validateCompanyName(name);
  if (await isCompanyNameTaken(name)) throw new CError("Company name already taken", 409);
  const [company] = await pool.execute(
    `SELECT * FROM companies WHERE name = '${last}' AND founders LIKE '%${userId}%';`
  );
  if (!company || !Array.isArray(company) || company.length === 0) throw new CError("Company not found", 404);
  const [companyObj] = company as ICompanySQL[];
  await pool.execute("UPDATE companies SET name = ? WHERE id = ?", [name, companyObj.id]);
  res.status(200).json({ message: "Company name changed successfully", name: name });
};

/**Changing the company's year*/
export const changeCompanyYear = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { name, year } = req.body;
  validateId(userId);
  validateYear(year);
  validateCompanyName(name);
  const [company] = await pool.execute(
    `SELECT * FROM companies WHERE name = '${name}' AND founders LIKE '%${userId}%';`
  );
  if (!company || !Array.isArray(company) || company.length === 0) throw new CError("Company not found", 404);
  const [companyObj] = company as ICompanySQL[];
  await pool.execute("UPDATE companies SET year = ? WHERE id = ?", [year, companyObj.id]);
  res.status(200).json({ message: "Company year changed successfully", year: year });
};
