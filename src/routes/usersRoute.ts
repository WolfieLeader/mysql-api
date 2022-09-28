import express from "express";
import { protect } from "../error/errorMiddleware";
import { getUsers, getUsersById } from "../controllers/get";

const usersRoute = express.Router();

/**Showing you all the Users that are in the database */
usersRoute.get("/", protect(getUsers));
/**Showing you the Users that are in the database by the given ids */
usersRoute.get("/:id", protect(getUsersById));

export default usersRoute;
