import express from "express";
import { protect } from "../error/errorMiddleware";
import { authToken } from "../controllers/auth";
import {
  changeName,
  changeEmail,
  changeHobbies,
  createCompany,
  changeCompanyName,
  changeNetworth,
} from "../controllers/actions";

const actionsRoute = express.Router();

/**Authenticates the user before all the other actions */
actionsRoute.use(protect(authToken));
actionsRoute.put("/name", protect(changeName));
actionsRoute.put("/email", protect(changeEmail));
actionsRoute.put("/networth", protect(changeNetworth));
actionsRoute.put("/hobbies", protect(changeHobbies));
actionsRoute.post("/company", protect(createCompany));
actionsRoute.put("/company-name", protect(changeCompanyName));

export default actionsRoute;
