import express from "express";
import { getSettings, resetTables } from "../controllers/setup";

const appRoute = express.Router();

appRoute.get("/", getSettings);
appRoute.post("/reset", resetTables);
appRoute.post("/setup", resetTables);

export default appRoute;
