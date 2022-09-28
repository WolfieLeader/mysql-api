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

/**Authenticating the user before all the other actions */
actionsRoute.use(protect(authToken));
/**Changing the user's name */
actionsRoute.put("/name", protect(changeName));
/**Changing the user's email */
actionsRoute.put("/email", protect(changeEmail));
/**Changing the user's networth */
actionsRoute.put("/networth", protect(changeNetworth));
/**Changing the user's hobbies */
actionsRoute.put("/hobbies", protect(changeHobbies));
/**Creating a company */
actionsRoute.post("/company", protect(createCompany));
/**Changing the company's name */
actionsRoute.put("/company-name", protect(changeCompanyName));

export default actionsRoute;
