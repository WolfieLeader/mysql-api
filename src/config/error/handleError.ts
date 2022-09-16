import CError from "./CError";

const handleError = (err: unknown) => {
  if (err instanceof Error) return new CError(err.message, 500);
  if (err instanceof CError) return err;
  if (typeof err === "string") return new CError(err, 500);
  return new CError("Unknown error", 500);
};

export default handleError;
