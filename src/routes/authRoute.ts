import express from "express";

import { createUser, loginUser } from "../controllers/auth";

const authRoute = express.Router();

authRoute.post("/signup", createUser);
authRoute.post("/register", createUser);
authRoute.post("/login", loginUser);
authRoute.post("/signin", loginUser);

export default authRoute;
