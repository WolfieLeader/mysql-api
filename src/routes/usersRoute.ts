import express from "express";
import { protect } from "../error/errorMiddleware";
import { getUsers } from "../controllers/get";

const usersRoute = express.Router();

/**Showing you all the Users that are in the database */
usersRoute.get("/", protect(getUsers));

export default usersRoute;
