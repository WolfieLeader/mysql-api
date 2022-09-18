import CError from "./CError";

const handleError = (err: unknown) => {
  if (err instanceof CError) return err;
  if (err instanceof Error) return new CError(err.message, 500);
  if (typeof err === "string") return new CError(err, 500);
  return new CError("Unknown error", 500);
};

export default handleError;
