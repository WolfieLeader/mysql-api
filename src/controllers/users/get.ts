import { Request, Response } from "express";
import pool from "../../config/sql/pool";
import CError from "../../error/CError";
import { formatParamsToNumbers } from "../../functions/format";
import { UserSQL } from "../../config/setup/users";
import { addQueries } from "../../config/sql/availableQueries";

export const getUsers = async (req: Request, res: Response) => {
  const [users] = await pool.execute("SELECT * FROM users" + addQueries(req, "id"));
  if (!Array.isArray(users)) throw new CError("Users not found", 404);
  if (Array.isArray(users) && users.length === 0) throw new CError("Users not found check queries", 404);
  res.status(200).json(users as UserSQL[]);
};

export const getUsersById = async (req: Request, res: Response) => {
  const ids = formatParamsToNumbers(req.params.id);
  const [users] = await pool.execute(`SELECT * FROM users WHERE id IN (${[ids]});`);
  if (!Array.isArray(users) || (Array.isArray(users) && users.length === 0)) throw new CError("Users not found", 404);
  res.status(200).json(users as UserSQL[]);
};
