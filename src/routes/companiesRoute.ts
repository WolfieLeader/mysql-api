import express from "express";
import { protect } from "../error/errorMiddleware";
import { getCompanies, getCompaniesById } from "../controllers/companies/get";

const companies = express.Router();

companies.get("/", protect(getCompanies));
companies.get("/:id", protect(getCompaniesById));

export default companies;
