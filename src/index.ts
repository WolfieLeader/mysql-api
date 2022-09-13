import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import appRoute from "./routes/app";
import usersRoute from "./routes/users";
import actionsRoute from "./routes/actions";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));

app.use("/", appRoute);
app.use("/users", usersRoute);
app.use("/actions", actionsRoute);

app.listen(PORT, () => console.log(`⚡Server is running on http://localhost:${PORT}/`));
