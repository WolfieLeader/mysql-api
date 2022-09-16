import express from "express";
import { authToken } from "../controllers/auth";
import { changeName, changeEmail, changeHobbies } from "../controllers/users/actions";

const actionsRoute = express.Router();

actionsRoute.use(authToken);
actionsRoute.post("/name", changeName);
actionsRoute.post("/email", changeEmail);
actionsRoute.post("/hobbies", changeHobbies);

export default actionsRoute;
