import { IUser, IUserRow, IUserObj } from "./user.d";
import { v4 as uuidv4 } from "uuid";
import CError from "../error/CError";
import { validateEmail, validateHobbies, validateId, validateName, validatePassword } from "../functions/validate";
import { isValidNumber } from "../functions/confirm";
import { saltIt } from "../functions/encrypt";

class User implements IUserObj {
  readonly id: string;
  readonly createdAt: Date | null;
  name: string;
  email: string;
  password: string;
  networth: number;
  hobbies: string[] | null;

  constructor(newUser: IUser);
  constructor(existingUser: IUserRow);
  constructor(user: IUser | IUserRow) {
    if (!("name" in user && "email" in user && "password" in user)) throw new CError("Missing Params");
    validateName(user.name);
    validateEmail(user.email);
    if ("id" in user && "createdAt" in user) {
      validateId(user.id);
      if (user.createdAt && !((user.createdAt as unknown) instanceof Date)) throw new CError("Invalid Date Type");
    } else {
      validatePassword(user.password);
    }

    if (user.networth) isValidNumber(user.networth, "Networth", true);
    if (Array.isArray(user.hobbies) && user.hobbies.length > 0) validateHobbies(user.hobbies);

    this.id = "id" in user && "createdAt" in user ? user.id : uuidv4();
    this.createdAt = "id" in user && "createdAt" in user ? user.createdAt : null;
    this.name = user.name.toLowerCase().trim();
    this.email = user.email.toLowerCase().trim();
    this.password = "id" in user && "createdAt" in user ? user.password : saltIt(user.password);
    this.networth = user.networth ? user.networth : 0;
    this.hobbies = Array.isArray(user.hobbies) && user.hobbies.length > 0 ? user.hobbies : [];
  }

  stringIt(): string {
    return `('${this.id}', 
            '${this.name}', 
            '${this.email}', 
            '${this.password}', 
            ${this.networth}, 
            '${JSON.stringify(this.hobbies)}')`;
  }
}
export default User;
