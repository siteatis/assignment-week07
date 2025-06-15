import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
export const db = new pg.Pool({ connectionString: process.env.DB_CONN_STR });
