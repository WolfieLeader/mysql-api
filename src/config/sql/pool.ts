import mysql from "mysql2/promise";
import { connectionSettings } from "./connection";

const pool = mysql.createPool(connectionSettings);

export default pool;
