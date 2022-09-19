import express from "express";
import { protect } from "../error/errorMiddleware";
import { getSettings, resetTables } from "../controllers/setup";

const appRoute = express.Router();

appRoute.get("/", protect(getSettings));
appRoute.post("/reset", protect(resetTables));
appRoute.post("/setup", protect(resetTables));

export default appRoute;
