import express from "express";
import { getSettings, resetUsersTable } from "../controllers";

const appRoute = express.Router();

appRoute.get("/", getSettings);
appRoute.post("/reset", resetUsersTable);

export default appRoute;
