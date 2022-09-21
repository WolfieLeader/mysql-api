import CError from "../error/CError";

export const isValidNumber = (number: unknown, param = "Number"): boolean => {
  if (!number) throw new CError(`Missing ${param}`, 400);
  if (typeof number !== "number") throw new CError(`Invalid ${param} Type`, 400);
  if (!Number.isSafeInteger(Number(number))) throw new CError(`${param} Out Of Range`, 400);
  if (Number(number) < 1) throw new CError(`${param} Must Be Positive`, 400);
  return true;
};

export const isValidString = (string: unknown, param = "String"): boolean => {
  if (!string) throw new CError(`Missing ${param}`, 400);
  if (typeof string !== "string") throw new CError(`Invalid ${param} Type`, 400);
  if (string.length > 255) throw new CError(`${param} Too Long`, 400);
  return true;
};
