import { IUser, IUserRow } from "../models/user.d";
import pool from "../config/sql/pool";

/**Checking whether the name is taken or not */
export const isEmailTaken = async (email: string): Promise<boolean> => {
  const [takenEmail] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
  if (Array.isArray(takenEmail) && takenEmail.length > 0) return true;
  return false;
};

/**Checking whether the name is taken or not */
export const isNameTaken = async (name: string): Promise<boolean> => {
  const [takenName] = await pool.execute("SELECT id FROM users WHERE name = ?", [name]);
  if (Array.isArray(takenName) && takenName.length > 0) return true;
  return false;
};

/**Checking whether the company name is taken or not */
export const isCompanyNameTaken = async (name: string): Promise<boolean> => {
  const [takenName] = await pool.execute("SELECT id FROM companies WHERE name = ?", [name]);
  if (Array.isArray(takenName) && takenName.length > 0) return true;
  return false;
};

/**Getting the user id by the user's name */
export const getUserIdByName = async (name: string): Promise<string> => {
  const [user] = await pool.execute("SELECT id FROM users WHERE name = ?", [name as string]);
  if (Array.isArray(user) && user.length > 0) {
    const [userObj] = user as IUserRow[];
    return userObj.id;
  }
  return "";
};
