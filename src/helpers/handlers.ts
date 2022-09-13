import { CError } from "../interfaces";
export const handleError = (error: any): CError => {
  if (error instanceof Error) {
    return { errMessage: error.message, errStatus: 500 };
  }
  if (
    "errMessage" in error &&
    typeof error.errMessage === "string" &&
    "errStatus" in error &&
    typeof error.errStatus === "number"
  ) {
    return error;
  }
  if (typeof error === "string") {
    return { errMessage: error, errStatus: 500 };
  }
  return { errMessage: "Unknown error", errStatus: 500 };
};

export const convertParamsToInt = (params: string): number[] | null => {
  if (params.length === 0) return null;

  if (Number.isInteger(Number(params))) {
    return [Number(params)];
  }
  if (params.includes(",")) {
    const ids = params.split(",");
    const array = ids.filter((id) => Number.isInteger(Number(id)));
    if (array.length === 0 || (array.length === 1 && array[0] === "")) return null;
    const numbers = array.map((id) => Number(id));
    return numbers;
  }
  return null;
};

enum Format {
  T = 1e12,
  B = 1e9,
  M = 1e6,
  K = 1e3,
}

export const formatStringToNumber = (stringedNumber: string): number => {
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
export const formatNumberToString = (number: number): string => {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  return formatter.format(number);
};

export const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const hasLettersDigitsSpacesOnly = (string: string): boolean => {
  const re = /^[a-zA-Z0-9 ]+$/;
  return re.test(string);
};
