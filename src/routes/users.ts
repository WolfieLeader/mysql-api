import express from "express";
import { getUsers, getUsersById, createUser, loginUser } from "../controllers";

const usersRoute = express.Router();

usersRoute.get("/", getUsers);
usersRoute.get("/:id", getUsersById);
usersRoute.post("/signup", createUser);
usersRoute.post("/login", loginUser);

export default usersRoute;
