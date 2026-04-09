import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER)
const db = await mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Sahil#150904",
  database: "dsa_ai_platform",
});

export default db;