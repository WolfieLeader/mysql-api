import express from "express";
import { protect } from "../error/errorMiddleware";
import { authToken } from "../controllers/auth";
import { changeName, changeEmail, changeHobbies } from "../controllers/users/actions";

const actionsRoute = express.Router();

actionsRoute.use(protect(authToken));
actionsRoute.put("/name", protect(changeName));
actionsRoute.put("/email", protect(changeEmail));
actionsRoute.put("/hobbies", protect(changeHobbies));

export default actionsRoute;
