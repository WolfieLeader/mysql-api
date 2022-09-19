import express from "express";
import { protect } from "../error/errorMiddleware";
import { authToken } from "../controllers/auth";
import { changeName, changeEmail, changeHobbies } from "../controllers/users/actions";

const actionsRoute = express.Router();

actionsRoute.use(protect(authToken));
actionsRoute.post("/name", protect(changeName));
actionsRoute.post("/email", protect(changeEmail));
actionsRoute.post("/hobbies", protect(changeHobbies));

export default actionsRoute;
