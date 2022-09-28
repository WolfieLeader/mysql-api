import express from "express";
import { protect } from "../error/errorMiddleware";
import { getCompanies, getCompaniesById } from "../controllers/get";

const companiesRoute = express.Router();

/**Showing you all the Companies that are in the database */
companiesRoute.get("/", protect(getCompanies));
/**Showing you the Companies that are in the database by the given ids */
companiesRoute.get("/:id", protect(getCompaniesById));

export default companiesRoute;
