import CError from "../config/error/CError";

enum Format {
  T = 1e12,
  B = 1e9,
  M = 1e6,
  K = 1e3,
}

export const stringToBigNumber = (stringedNumber: string): number => {
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
  const symbolOf = symbol as keyof typeof Format;
  return number * Format[symbolOf];
};

export const bigNumberToString = (number: number): string => {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  return formatter.format(number);
};

export const formatParamsToNumbers = (params: unknown): number[] => {
  if (!params) throw new CError("Missing Params", 400);
  if (typeof params !== "string") throw new CError("Invalid Params", 400);
  if (Number.isSafeInteger(Number(params))) return [Number(params)];
  if (!params.includes(",")) throw new CError("Invalid Params", 400);
  const ids = params.split(",");
  const numbers = ids.filter((id) => Number.isSafeInteger(Number(id)) && Number(id) > 0).map((id) => Number(id));
  if (numbers.length === 0) throw new CError("Invalid Params", 400);
  return numbers;
};
