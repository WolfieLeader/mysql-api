import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

export default app;
