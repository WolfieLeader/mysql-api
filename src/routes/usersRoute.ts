import express from "express";
import { protect } from "../error/errorMiddleware";
import { getUsers, getUsersById } from "../controllers/get";

const usersRoute = express.Router();

usersRoute.get("/", protect(getUsers));
usersRoute.get("/:id", protect(getUsersById));

export default usersRoute;
