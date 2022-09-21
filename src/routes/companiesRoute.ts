import express from "express";
import { protect } from "../error/errorMiddleware";
import { getCompanies, getCompaniesById } from "../controllers/get";

const companiesRoute = express.Router();

companiesRoute.get("/", protect(getCompanies));
companiesRoute.get("/:id", protect(getCompaniesById));

export default companiesRoute;
