import { Request } from "express";

export type Order = "desc" | "asc";

export const addQueries = (req: Request): { order: string; limit: number; offset: number } => {
  const { order, limit, offset } = req.query;

  const orderQuery: Order = order && typeof order === "string" && order.toLowerCase() === "desc" ? "desc" : "asc";
  const isStringedNumber = (value: any) =>
    value && typeof value === "string" && !isNaN(Number(value)) && Number(value) > 0;
  const limitQuery = isStringedNumber(limit) ? Number(limit) : 10;
  const offsetQuery = isStringedNumber(offset) ? Number(offset) : 0;
  return { order: orderQuery, limit: limitQuery, offset: offsetQuery };
};
