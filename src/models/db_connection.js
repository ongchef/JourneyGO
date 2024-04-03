import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise()
const db = pgp({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
});

export default db;