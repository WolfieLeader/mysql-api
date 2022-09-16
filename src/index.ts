import dotenv from "dotenv";

dotenv.config();

import app from "./config/app";
import appRoute from "./routes/appRoute";
import authRoute from "./routes/authRoute";
import usersRoute from "./routes/usersRoute";
// import actionsRoute from "./routes/actionsRoute";

const PORT = process.env.PORT || 5000;

app.use("/", appRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);
// app.use("/actions", actionsRoute);

app.listen(PORT, () => console.log(`⚡Server is running on http://localhost:${PORT}/`));
