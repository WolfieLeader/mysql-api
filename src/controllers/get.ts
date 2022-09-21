import { Request, Response } from "express";
import pool from "../config/sql/pool";
import { addQueries } from "../config/sql/availableQueries";
import CError from "../error/CError";
import { UserSQL } from "../interfaces/users";
import { CompanySQL } from "../interfaces/companies";
import { formatParamsToNumbers } from "../functions/format";

export const getUsers = async (req: Request, res: Response) => {
  const [users] = await pool.execute("SELECT * FROM users" + addQueries(req, "id"));
  if (!Array.isArray(users)) throw new CError("Users not found", 404);
  if (Array.isArray(users) && users.length === 0) throw new CError("Users not found check queries", 404);
  res.status(200).json(users as UserSQL[]);
};

export const getCompanies = async (req: Request, res: Response) => {
  const [companies] = await pool.execute("SELECT * FROM companies" + addQueries(req, "id"));
  if (!Array.isArray(companies)) throw new CError("Users not found", 404);
  if (Array.isArray(companies) && companies.length === 0) throw new CError("Companies not found", 404);
  res.status(200).json(companies as CompanySQL[]);
};

export const getUsersById = async (req: Request, res: Response) => {
  const ids = formatParamsToNumbers(req.params.id);
  const [users] = await pool.execute(`SELECT * FROM users WHERE id IN (${[ids]});`);
  if (!Array.isArray(users) || (Array.isArray(users) && users.length === 0)) throw new CError("Users not found", 404);
  res.status(200).json(users as UserSQL[]);
};

export const getCompaniesById = async (req: Request, res: Response) => {
  const ids = formatParamsToNumbers(req.params.id);
  const [companies] = await pool.execute(`SELECT * FROM companies WHERE id IN (${[ids]});`);
  if (!Array.isArray(companies) || (Array.isArray(companies) && companies.length === 0))
    throw new CError("Companies not found", 404);
  res.status(200).json(companies as CompanySQL[]);
};
