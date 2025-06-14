import express from "express"; import pg from "pg";
import cors from "cors"; import dotenv from "dotenv"; dotenv.config();
const db = new pg.Pool({ connectionString: process.env.DB_CONN_STR });
const app = express(); app.use(cors()); app.use(express.json()); app.listen(process.env.APP_PORT);
