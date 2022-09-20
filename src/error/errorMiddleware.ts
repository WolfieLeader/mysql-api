import { Request, Response, NextFunction } from "express";
import handleError from "./handleError";

export const protect = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  const error = handleError(err);
  console.log(error.message);
  res.status(error.status).json({ error: error.message });
};
