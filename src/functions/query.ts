import { UserSQL } from "../config/setup/users";
import pool from "../config/sql/pool";
import { validateName } from "./validate";

export const isEmailTaken = async (email: string): Promise<boolean> => {
  const [takenEmail] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
  if (Array.isArray(takenEmail) && takenEmail.length > 0) return true;
  return false;
};

export const getUserIdByName = async (name: unknown): Promise<number> => {
  if (validateName(name)) {
    const [user] = await pool.execute("SELECT id FROM users WHERE name = ?", [name]);
    if (Array.isArray(user) && user.length > 0) {
      const [userObj] = user as UserSQL[];
      return userObj.id;
    }
  }
  return -1;
};
