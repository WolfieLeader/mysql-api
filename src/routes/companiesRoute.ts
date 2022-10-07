import express from "express";
import { protect } from "../error/errorMiddleware";
import { getCompanies } from "../controllers/get";

const companiesRoute = express.Router();

/**Showing you all the Companies that are in the database */
companiesRoute.get("/", protect(getCompanies));

export default companiesRoute;
