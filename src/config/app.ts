import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import appRoute from "../routes/appRoute";
import authRoute from "../routes/authRoute";
import usersRoute from "../routes/usersRoute";
import companiesRoute from "../routes/companiesRoute";
import actionsRoute from "../routes/actionsRoute";

import { errorMiddleware } from "../error/errorMiddleware";

const app: Application = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/", appRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/companies", companiesRoute);
app.use("/actions", actionsRoute);

app.use(errorMiddleware);

export default app;
