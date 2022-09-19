import { Request } from "express";

type Order = "ASC" | "DESC";

const getOrder = (order: unknown): Order => {
  if (order && typeof order === "string") {
    const orderUpper = order.toUpperCase();
    if (orderUpper === "ASC" || orderUpper === "DESC") {
      return orderUpper;
    }
  }
  return "ASC";
};

const getLimit = (limit: unknown): number => {
  if (limit && typeof limit === "string") {
    const limitNumber = Number(limit);
    if (!Number.isNaN(limitNumber) && limitNumber > 0 && limitNumber <= 100) {
      return limitNumber;
    }
  }
  return 10;
};

const getOffset = (offset: unknown): number => {
  if (offset && typeof offset === "string") {
    const offsetNumber = Number(offset);
    if (!Number.isNaN(offsetNumber) && offsetNumber > 0) {
      return offsetNumber;
    }
  }
  return 0;
};

export const addQueries = (req: Request, by: string): string => {
  const { order, limit, offset } = req.query;
  const string = ` ORDER BY ${by} ${getOrder(order)} LIMIT ${getOffset(offset)},${getLimit(limit)};`;
  return string;
};
