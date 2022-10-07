import { Request, Response } from "express";
import { defaultUsers } from "../config/default/users";
import pool from "../config/sql/pool";
import { connectionSettings } from "../config/sql/connection";
import { createCompaniesTable, createUsersTable } from "../config/sql/tables";
import User from "../models/User";
import { stringToBigNumber } from "../functions/format";
import Company from "../models/Company";
import { defaultCompanies } from "../config/default/companies";

/**Showing the database connection settings */
export const getSettings = (req: Request, res: Response) => {
  return res.status(200).json({ settings: connectionSettings });
};

/**This function will reset the tables in the database */
export const resetTables = async (req: Request, res: Response) => {
  await pool.execute("DROP TABLE IF EXISTS companies;");
  await pool.execute("DROP TABLE IF EXISTS users;");

  await pool.execute(createUsersTable);
  const users = defaultUsers
    .map((user) => {
      return new User({
        name: user.name,
        email: user.email,
        password: user.password,
        networth: user.networth ? stringToBigNumber(user.networth) : 0,
        hobbies: user.hobbies ? user.hobbies : null,
      }).stringIt();
    })
    .join(", ");
  await pool.execute(`INSERT INTO users(id,name,email,password,networth,hobbies) VALUES ${users};`);

  await pool.execute(createCompaniesTable);
  const companies = (
    await Promise.all(
      defaultCompanies.map(async (company) => {
        const [founders] = await pool.execute(
          `SELECT id FROM users WHERE name IN (${company.foundersNames.map((name) => `'${name}'`).join(", ")});`
        );
        if (!Array.isArray(founders)) throw new Error("Invalid Founders");
        const foundersObj = founders as { id: string }[];
        const foundersIds = foundersObj.map((founder) => founder.id);
        return new Company({
          name: company.name,
          founders: foundersIds,
          year: company.year,
        }).stringIt();
      })
    )
  ).join(", ");
  await pool.execute(`INSERT INTO companies(id,name,founders,year) VALUES ${companies};`);

  const [results] = await pool.execute(
    `SELECT companies.name AS Company, users.name AS Founder FROM companies LEFT JOIN users
    ON JSON_CONTAINS(companies.founders, CAST(CONCAT('["',users.id,'"]') AS JSON), '$') 
    ORDER BY companies.name ASC;`
  );
  res.status(200).json(results);
};
