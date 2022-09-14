import { Request, Response } from "express";
import mysql from "mysql2/promise";
import { connectionSettings, defaultUsers } from "../helpers/defaultSettings";
import { handleError, formatStringToNumber } from "../helpers/handlers";
import { saltIt } from "../helpers/encryption";

export const resetUsersTable = async (req: Request, res: Response) => {
  const mappedUsers = defaultUsers.map(
    (user) =>
      `('${user.name}',
        ${user.netWorth ? formatStringToNumber(user.netWorth) : null},
        ${user.hobbies ? `'${JSON.stringify(user.hobbies)}'` : null},
        '${user.email.toLowerCase()}',
        '${saltIt(user.password)}')`
  );

  const queries = [
    //Remove all users
    "DROP TABLE IF EXISTS users;",
    //Create table
    `CREATE TABLE users(
        id INT AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        netWorth BIGINT,
        hobbies JSON,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
      )
      `,
    //Insert users
    `INSERT INTO users(name,netWorth,hobbies,email,password) VALUES ${mappedUsers};`,
    //Show all users
    "SELECT * FROM users;",
  ];

  try {
    const connection = await mysql.createConnection(connectionSettings);
    for (const query of queries) {
      const [rows] = await connection.execute(query);
      if (query.includes("SELECT")) {
        res.status(201).json(rows);
        break;
      }
    }
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};
