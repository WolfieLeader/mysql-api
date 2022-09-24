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

export const changeName = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { name } = req.body;
  validateId(id);
  validateName(name);
  if (await isNameTaken(name)) throw new CError("Name already taken", 409);
  await pool.execute("UPDATE users SET name = ? WHERE id = ?", [name, id]);
  res.status(200).json({ message: "Name changed successfully", name: name });
};

export const changeEmail = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { email } = req.body;
  validateId(id);
  validateEmail(email);
  const isTaken = await isEmailTaken(email.toLowerCase());
  if (isTaken) throw new CError("Email already taken", 409);
  await pool.execute("UPDATE users SET email = ? WHERE id = ?", [email.toLowerCase(), id]);
  res.status(200).json({ message: "Email changed successfully", email: email });
};

export const changeHobbies = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { hobbies } = req.body;
  validateId(id);
  validateHobbies(hobbies);
  await pool.execute("UPDATE users SET hobbies = ? WHERE id = ?", [hobbies, id]);
  res.status(200).json({ message: "Hobbies changed successfully", hobbies: hobbies });
};

export const createCompany = async (req: Request, res: Response) => {
  const { id } = res.locals;
  const { name, foundedAt } = req.body;
  validateId(id);
  validateFoundedAt(foundedAt);
  validateCompanyName(name);
  console.log(id, name, foundedAt);
  await pool.execute("INSERT INTO companies (name, foundedAt, founderId) VALUES (?, ?, ?)", [name, foundedAt, id]);
  res.status(201).json({ message: "Company created successfully", name: name, foundedAt: foundedAt });
};
