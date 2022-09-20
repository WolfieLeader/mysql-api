import { Request, Response } from "express";
import pool from "../../config/sql/pool";
import CError from "../../error/CError";
import { formatParamsToNumbers } from "../../functions/format";
import { CompanySQL } from "../../config/setup/companies";
import { addQueries } from "../../config/sql/availableQueries";

export const getCompanies = async (req: Request, res: Response) => {
  const [companies] = await pool.execute("SELECT * FROM companies" + addQueries(req, "id"));
  if (!Array.isArray(companies)) throw new CError("Users not found", 404);
  if (Array.isArray(companies) && companies.length === 0) throw new CError("Companies not found", 404);
  res.status(200).json(companies as CompanySQL[]);
};

export const getCompaniesById = async (req: Request, res: Response) => {
  const ids = formatParamsToNumbers(req.params.id);
  const [companies] = await pool.execute(`SELECT * FROM companies WHERE id IN (${[ids]});`);
  if (!Array.isArray(companies) || (Array.isArray(companies) && companies.length === 0))
    throw new CError("Companies not found", 404);
  res.status(200).json(companies as CompanySQL[]);
};
