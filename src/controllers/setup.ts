import { Request, Response } from "express";
import { formattedUsers } from "../config/setup/users";
import { unformattedCompanies } from "../config/setup/companies";
import pool from "../config/sql/pool";
import { connectionSettings } from "../config/sql/connection";

/**Showing the database connection settings */
export const getSettings = (req: Request, res: Response) => {
  return res.status(200).json({ settings: connectionSettings });
};

/**This function will reset the tables in the database */
export const resetTables = async (req: Request, res: Response) => {
  const dropQueries = [
    //Remove all companies
    "DROP TABLE IF EXISTS companies;",
    //Remove all users
    "DROP TABLE IF EXISTS users;",
  ];
  const usersQueries = [
    //Create users table
    `CREATE TABLE users(
    id INT AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    netWorth BIGINT DEFAULT 0,
    hobbies JSON,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  );
  `,
    //Insert users
    `INSERT INTO users(name,netWorth,hobbies,email,password) VALUES ${formattedUsers};`,
  ];

  const companiesQueries = [
    //Create companies table
    `CREATE TABLE companies(
    id INT AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    founderId INT NOT NULL,
    foundedAt INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (founderId) REFERENCES users(id)
  );
  `,
    //Insert companies
    `INSERT INTO companies(name,founderId,foundedAt) VALUES ${await unformattedCompanies};`,
  ];

  for (const query of dropQueries) {
    await pool.execute(query);
  }
  for (const query of usersQueries) {
    await pool.execute(query);
  }
  for (const query of companiesQueries) {
    await pool.execute(query);
  }
  const [results] = await pool.execute(
    "SELECT companies.name AS Company,users.name AS FoundedBy FROM users RIGHT JOIN companies ON users.id=companies.founderId"
  );
  res.status(200).json(results);
};
