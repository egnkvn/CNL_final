import mysql from 'mysql2';
import * as dotenv from "dotenv";
dotenv.config()

const DB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

export default DB;