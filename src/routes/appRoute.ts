import express from "express";
import { protect } from "../error/errorMiddleware";
import { getSettings, resetTables } from "../controllers/setup";
import { getAll } from "../controllers/get";

const appRoute = express.Router();

/**Showing you all the Companies that are in the database and the Users that own them */
appRoute.get("/", protect(getAll));
/**Showing you the settings of the database connection*/
appRoute.get("/settings", protect(getSettings));
/**Resetting the tables in the database */
appRoute.post("/reset", protect(resetTables));
appRoute.post("/setup", protect(resetTables));

export default appRoute;
