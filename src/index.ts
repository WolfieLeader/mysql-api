import app from "./config/app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡Server is running on http://localhost:${PORT}/`));
