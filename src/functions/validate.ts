import CError from "../config/error/CError";
import jsonwebtoken from "jsonwebtoken";
import { hashIt } from "./encrypt";
import { secretKey } from "../config/secretKey";

const isEmail = (email: string): boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

const hasLettersDigitsSpacesOnly = (string: string): boolean => {
  const re = /^[a-zA-Z0-9 ]+$/;
  return re.test(string);
};

const hasLettersDigitsSpacesSymbolsOnly = (string: string): boolean => {
  const re = /^[a-zA-Z0-9 !@#$%^&*()_+\-=\[\]{}:\\|,.<>\/?]+$/;
  return re.test(string);
};

export const validateEmail = (email: unknown): boolean => {
  if (!email) throw new CError("Missing Email", 400);
  if (typeof email !== "string") throw new CError("Invalid Email Type", 400);
  if (email.length > 255) throw new CError("Email too long", 400);
  if (!isEmail(email)) throw new CError("Invalid Email", 400);
  return true;
};

export const validateName = (name: unknown): boolean => {
  if (!name) throw new CError("Missing Name", 400);
  if (typeof name !== "string") throw new CError("Invalid Name Type", 400);
  if (name.length < 4 || name.length > 20) throw new CError("Name must be between 4 and 20 characters", 400);
  if (!hasLettersDigitsSpacesOnly(name)) throw new CError("Invalid Name", 400);
  return true;
};

export const validatePassword = (password: unknown): boolean => {
  if (!password) throw new CError("Missing Password", 400);
  if (typeof password !== "string") throw new CError("Invalid Password Type", 400);
  if (password.length < 8 || password.length > 20)
    throw new CError("Password must be between 8 and 20 characters", 400);
  if (!hasLettersDigitsSpacesSymbolsOnly(password)) throw new CError("Invalid Password", 400);
  return true;
};

export const validateHobbies = (hobbies: unknown): boolean => {
  if (!hobbies) throw new CError("Missing Hobbies", 400);
  if (!Array.isArray(hobbies)) throw new CError("Invalid Hobbies Type", 400);
  if (hobbies.length === 0) throw new CError("Missing Hobbies", 400);
  if (hobbies.length > 5) throw new CError("Too Many Hobbies", 400);
  hobbies.forEach((hobby: unknown) => {
    if (!hobby) throw new CError("Missing Hobby", 400);
    if (typeof hobby !== "string") throw new CError("Invalid Hobby Type", 400);
    if (hobby.length < 2 || hobby.length > 30) throw new CError("Hobby must be between 2 and 30 characters", 400);
    if (!hasLettersDigitsSpacesOnly(hobby)) throw new CError("Invalid Hobby", 400);
  });
  return true;
};

export const validateId = (id: unknown): boolean => {
  if (!id) throw new CError("Missing Id", 400);
  if (typeof id !== "number") throw new CError("Invalid Id Type", 400);
  if (id < 1) throw new CError("Invalid Id", 400);
  if (!Number.isSafeInteger(id)) throw new CError("Out Of Range", 400);
  return true;
};

export const validateDecoded = (decoded: string | jsonwebtoken.JwtPayload): boolean => {
  if (!decoded) throw new CError("Missing Token Content", 400);
  if (typeof decoded !== "object") throw new CError("Invalid Token Content Type", 400);
  if (!("id" in decoded)) throw new CError("Invalid Token", 400);
  validateId(decoded.id);
  return true;
};

export const validateToken = (token: unknown): boolean => {
  if (!token) throw new CError("Missing Token", 400);
  if (typeof token !== "string") throw new CError("Invalid Token Type", 400);
  const jwtKey = hashIt(secretKey);
  const decoded = jsonwebtoken.verify(token, jwtKey);
  validateDecoded(decoded);
  console.log(jsonwebtoken.decode(token));
  return true;
};
