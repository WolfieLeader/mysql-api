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
  if (isValidString(email, "Email") && typeof email === "string") {
    if (!isEmail(email)) throw new CError("Invalid Email", 400);
    return true;
  }
  return false;
};

export const validateName = (name: unknown): boolean => {
  if (isValidString(name, "Name") && typeof name === "string") {
    if (name.length < 4 || name.length > 20) throw new CError("Name must be between 4 and 20 characters", 400);
    if (!hasLettersDigitsSpacesOnly(name)) throw new CError("Invalid Name", 400);
    return true;
  }
  return false;
};

export const validatePassword = (password: unknown): boolean => {
  if (isValidString(password, "Password") && typeof password === "string") {
    if (password.length < 8 || password.length > 20)
      throw new CError("Password must be between 8 and 20 characters", 400);
    if (!hasLettersDigitsSpacesSymbolsOnly(password)) throw new CError("Invalid Password", 400);
    return true;
  }
  return false;
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
  if (isValidNumber(id, "Id")) return true;
  return false;
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
