import { Request, Response } from "express";
import mysql from "mysql2/promise";
import { convertParamsToInt, connectionSettings, handleError, validateEmail } from "../helpers";
import { CError, UserSQL } from "../interfaces";

export const getSettings = (req: Request, res: Response) => {
  return res.status(200).json({ settings: connectionSettings });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const connection = await mysql.createConnection(connectionSettings);
    const [users] = await connection.execute("SELECT * FROM users");
    if (!Array.isArray(users)) {
      await connection.end();
      throw { errMessage: "Users not found", errStatus: 404 } as CError;
    }
    res.status(200).json(users as UserSQL[]);
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};

export const getUsersById = async (req: Request, res: Response) => {
  try {
    const ids = convertParamsToInt(req.params.id);
    if (ids === null) {
      throw { errMessage: "Invalid id", errStatus: 400 } as CError;
    }
    const connection = await mysql.createConnection(connectionSettings);
    const [users] = await connection.execute(`SELECT * FROM users WHERE id IN (${ids.join(",")});`);
    if (!Array.isArray(users)) {
      await connection.end();
      throw { errMessage: "Users not found", errStatus: 404 } as CError;
    }
    res.status(200).json(users as UserSQL[]);
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};

export const getUsersByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    if (!email) {
      throw { errMessage: "Missing params", errStatus: 400 } as CError;
    }
    if (typeof email !== "string") {
      throw { errMessage: "Invalid params", errStatus: 400 } as CError;
    }
    if (!validateEmail(email)) {
      throw { errMessage: "Invalid email", errStatus: 400 } as CError;
    }
    const connection = await mysql.createConnection(connectionSettings);
    const [users] = await connection.execute(`SELECT * FROM users WHERE email = '${email}';`);
    if (!Array.isArray(users)) {
      await connection.end();
      throw { errMessage: "Users not found", errStatus: 404 } as CError;
    }
    res.status(200).json(users as UserSQL[]);
    await connection.end();
  } catch (err) {
    const { errStatus, errMessage } = handleError(err);
    res.status(errStatus).json({ error: errMessage });
  }
};
