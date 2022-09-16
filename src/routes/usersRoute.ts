import express from "express";
import { getUsers, getUsersById } from "../controllers/users/get";

const usersRoute = express.Router();

usersRoute.get("/", getUsers);
usersRoute.get("/:id", getUsersById);

export default usersRoute;
