import express from "express";
import { protect } from "../error/errorMiddleware";
import { getCompanies, getCompaniesById } from "../controllers/companies/get";

const companiesRoute = express.Router();

companiesRoute.get("/", protect(getCompanies));
companiesRoute.get("/:id", protect(getCompaniesById));

export default companiesRoute;
