import { IUserModel, IUserRequired } from "./user.d";
import { v4 as uuidv4 } from "uuid";
import { validateEmail, validateHobbies, validateName, validatePassword } from "../functions/validate";
import { isValidNumber } from "../functions/confirm";
import { saltIt } from "../functions/encrypt";

class User implements IUserModel {
  readonly id: string;
  name: string;
  email: string;
  password: string;
  networth: number;
  hobbies: string[];

  constructor(user: IUserRequired) {
    validateName(user.name);
    validateEmail(user.email);
    validatePassword(user.password);

    if (user.networth) isValidNumber(user.networth, "Networth", true);
    if (Array.isArray(user.hobbies) && user.hobbies.length > 0) validateHobbies(user.hobbies);

    this.id = uuidv4();
    this.name = user.name.toLowerCase().trim();
    this.email = user.email.toLowerCase().trim();
    this.password = saltIt(user.password);
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
