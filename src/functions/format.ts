import CError from "../error/CError";
import { isValidNumber, isValidNumberString } from "./confirm";

/**Trillion, Billion, Million and Thousand */
enum Format {
  T = 1e12,
  B = 1e9,
  M = 1e6,
  K = 1e3,
}

/**Formats a string that contains a number with a suffix to a legit number */
export const stringToBigNumber = (stringedNumber: string): number => {
  //Check if the number given is already a number
  if (!Number.isNaN(Number(stringedNumber))) {
    if (stringedNumber.includes(".")) {
      return Number.parseFloat(stringedNumber);
    }
    return Number(stringedNumber);
  }
  const number = Number(stringedNumber.slice(0, -1));
  const symbol = stringedNumber.slice(-1).toUpperCase();
  if (Number.isNaN(number)) return -1;
  if (!Object.keys(Format).includes(symbol)) {
    return -1;
  }
  return number * Format[symbol as keyof typeof Format];
};

/**Format a number to a number with a suffix */
export const bigNumberToString = (number: number): string => {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  return formatter.format(number);
};

/**Gets a string and returns an array if the string wrote like an array */
export const formatParamsToNumbers = (params: unknown): number[] => {
  if (!params) throw new CError("Missing Params", 400);
  if (typeof params === "number") {
    isValidNumber(params, "Params");
    return [params];
  }
  if (typeof params !== "string") throw new CError("Invalid Params Type", 400);

  if (Number.isInteger(Number(params))) {
    isValidNumberString(params, "Params");
    return [Number(params)];
  }

  if (!params.includes(",")) throw new CError("Invalid Params Content", 400);
  const ids = params.split(",");
  const numbers = ids.filter((id) => Number.isSafeInteger(Number(id)) && Number(id) > 0).map((id) => Number(id));
  if (numbers.length === 0) throw new CError("Invalid Params", 400);
  return numbers;
};
