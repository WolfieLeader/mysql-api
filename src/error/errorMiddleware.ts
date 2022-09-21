import { Request, Response, NextFunction } from "express";
import handleError from "./handleError";

/**Wrap your function with this High Order Function to avoid using try...catch all the time */
export const protect = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**This is the middleware that will catch all the errors and properly handle them */
export const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  const error = handleError(err);
  console.log(error.message);
  res.status(error.status).json({ error: error.message });
};
