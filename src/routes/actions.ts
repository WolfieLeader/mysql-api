import express from "express";
import { authToken, changeName, changeEmail, changeHobbies, changeNetWorth } from "../controllers";

const actionsRoute = express.Router();

actionsRoute.use(authToken);
actionsRoute.post("/name", changeName);
actionsRoute.post("/email", changeEmail);
actionsRoute.post("/hobbies", changeHobbies);
actionsRoute.post("/networth", changeNetWorth);

export default actionsRoute;
