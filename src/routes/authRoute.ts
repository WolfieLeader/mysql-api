import express from "express";
import { protect } from "../error/errorMiddleware";
import { createUser, loginUser } from "../controllers/auth";

const authRoute = express.Router();

/**Creating a new user*/
authRoute.post("/signup", protect(createUser));
authRoute.post("/register", protect(createUser));
/**Logging in existing user*/
authRoute.post("/login", protect(loginUser));
authRoute.post("/signin", protect(loginUser));

export default authRoute;
