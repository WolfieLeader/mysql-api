import { Request, Response } from "express";
import pool from "../config/sql/pool";
import { addQueries } from "../config/sql/availableQueries";
import CError from "../error/CError";
import { IUser } from "../models/user.d";
import { ICompany } from "../models/company.d";

/**Getting all the companies and the users who own them */
export const getAll = async (req: Request, res: Response) => {
  const [results] = await pool.execute(
    `SELECT companies.name AS Company, users.name AS Founder FROM companies LEFT JOIN users
    ON JSON_CONTAINS(companies.founders, CAST(CONCAT('["',users.id,'"]') AS JSON), '$') 
    ORDER BY companies.name ASC;`
  );
  if (!results) throw new CError("No results found", 404);
  if (!Array.isArray(results)) throw new CError("Results is not an array");
  return res.status(200).json({ results });
};

/**Getting all the users */
export const getUsers = async (req: Request, res: Response) => {
  const { order, limit, offset } = addQueries(req);
  const [users] = await pool.execute(`SELECT * FROM users ORDER BY name ${order} LIMIT ${offset},${limit};`);
  if (!Array.isArray(users)) throw new CError("Users not found", 404);
  if (Array.isArray(users) && users.length === 0) throw new CError("Users not found check queries", 404);
  res.status(200).json(users as IUser[]);
};

/**Getting all the companies */
export const getCompanies = async (req: Request, res: Response) => {
  const { order, limit, offset } = addQueries(req);
  const [companies] = await pool.execute(`SELECT * FROM companies ORDER BY name ${order} LIMIT ${offset},${limit};`);
  if (!Array.isArray(companies)) throw new CError("Companies not found", 404);
  if (Array.isArray(companies) && companies.length === 0) throw new CError("Companies not found", 404);
  res.status(200).json(companies as ICompany[]);
};
