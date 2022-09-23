import CError from "../error/CError";
import jsonwebtoken from "jsonwebtoken";
import { hashIt } from "./encrypt";
import { secretKey } from "../config/secretKey";
import { isValidNumber, isValidString } from "./confirm";

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
  isValidString(email, "Email");
  if (!isEmail(email as string)) throw new CError("Invalid Email", 400);
  return true;
};

export const validateName = (name: unknown): boolean => {
  isValidString(name, "Name");
  const nameStr = name as string;
  if (nameStr.length < 4 || nameStr.length > 20) throw new CError("Name must be between 4 and 20 characters", 400);
  if (!hasLettersDigitsSpacesOnly(nameStr)) throw new CError("Invalid Name", 400);
  return true;
};

export const validatePassword = (password: unknown): boolean => {
  isValidString(password, "Password");
  const passwordStr = password as string;
  if (passwordStr.length < 8 || passwordStr.length > 20)
    throw new CError("Password must be between 8 and 20 characters", 400);
  if (!hasLettersDigitsSpacesSymbolsOnly(passwordStr)) throw new CError("Invalid Password", 400);
  return true;
};

export const validateHobbies = (hobbies: unknown): boolean => {
  if (!hobbies) throw new CError("Missing Hobbies", 400);
  if (!Array.isArray(hobbies)) throw new CError("Invalid Hobbies Type", 400);
  if (hobbies.length === 0) throw new CError("Missing Hobbies", 400);
  if (hobbies.length > 5) throw new CError("Too Many Hobbies", 400);
  hobbies.forEach((hobby: unknown) => {
    isValidString(hobby, "Hobby");
    const hobbyStr = hobby as string;
    if (hobbyStr.length < 2 || hobbyStr.length > 30) throw new CError("Hobby must be between 2 and 30 characters", 400);
    if (!hasLettersDigitsSpacesOnly(hobbyStr)) throw new CError("Invalid Hobby", 400);
  });
  return true;
};

export const validateId = (id: unknown): boolean => {
  isValidNumber(id, "Id");
  return true;
};

export const validateDecoded = (decoded: unknown): boolean => {
  if (!decoded) throw new CError("Missing Token Content", 400);
  if (typeof decoded !== "object") throw new CError("Invalid Token Content Type", 400);
  if (!decoded.hasOwnProperty("id")) throw new CError("Missing Id", 400);
  const { id } = decoded as { id: unknown };
  validateId(id);
  return true;
};

export const validateToken = (token: unknown): boolean => {
  if (!token) throw new CError("Missing Token", 400);
  if (typeof token !== "string") throw new CError("Invalid Token Type", 400);
  const jwtKey = hashIt(secretKey);
  const decoded = jsonwebtoken.verify(token, jwtKey);
  validateDecoded(decoded);
  return true;
};

export const validateAuthorization = (authorization: unknown): boolean => {
  if (!authorization) throw new CError("Missing Authorization", 400);
  if (typeof authorization !== "string") throw new CError("Invalid Authorization Type", 400);
  if (!authorization.startsWith("Bearer")) throw new CError("Invalid Authorization", 400);
  const token = authorization.split(" ")[1];
  validateToken(token);
  return true;
};

export const validateFoundedAt = (foundedAt: unknown): boolean => {
  isValidNumber(foundedAt, "Founded At");
  const foundedAtNum = foundedAt as number;
  const currentYear = new Date().getUTCFullYear();
  if (foundedAtNum < 0 || foundedAtNum > currentYear) throw new CError("Invalid Founded At", 400);
  return true;
};

export const validateCompanyName = (name: unknown): boolean => {
  isValidString(name, "Company Name");
  const nameStr = name as string;
  if (nameStr.length < 2 || nameStr.length > 30)
    throw new CError("Company Name must be between 4 and 20 characters", 400);
  if (!hasLettersDigitsSpacesOnly(nameStr)) throw new CError("Invalid Company Name", 400);
  return true;
};
