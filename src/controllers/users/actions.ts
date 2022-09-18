import { Request, Response } from "express";
import CError from "../../error/CError";
import handleError from "../../error/handleError";
import pool from "../../config/sql/pool";
import { isEmailTaken } from "../../functions/query";
import { validateEmail, validateName, validateId, validateHobbies } from "../../functions/validate";

export const changeName = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals;
    const { name } = req.body;
    if (validateId(id) && validateName(name)) {
      await pool.execute("UPDATE users SET name = ? WHERE id = ?", [name, id]);
      res.status(200).json({ message: "Name changed to:" + name });
    }
    throw new CError("Invalid Params", 400);
  } catch (err) {
    const error = handleError(err);
    res.status(error.status).json({ error: error.message });
  }
};

export const changeEmail = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals;
    const { email } = req.body;
    if (validateId(id) && validateEmail(email)) {
      const isTaken = await isEmailTaken(email.toLowerCase());
      if (isTaken) throw new CError("Email already taken", 409);
      await pool.execute("UPDATE users SET email = ? WHERE id = ?", [email.toLowerCase(), id]);
      res.status(200).json({ message: "Email changed to:" + email.toLowerCase() });
    }
    throw new CError("Invalid Params", 400);
  } catch (err) {
    const error = handleError(err);
    res.status(error.status).json({ error: error.message });
  }
};

export const changeHobbies = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals;
    const { hobbies } = req.body;
    if (validateId(id) && validateHobbies(hobbies)) {
      await pool.execute("UPDATE users SET hobbies = ? WHERE id = ?", [hobbies, id]);
      res.status(200).json({ message: "Hobbies changed to:" + hobbies });
    }
    throw new CError("Invalid Params", 400);
  } catch (err) {
    const error = handleError(err);
    res.status(error.status).json({ error: error.message });
  }
};
