import CError from "./CError";

/**Makes every other type of error to CError*/
const handleError = (err: unknown): CError => {
  if (err instanceof CError) return err;
  if (err instanceof Error) return new CError(err.message);
  if (typeof err === "string") return new CError(err);
  return new CError("Unknown error");
};

export default handleError;
