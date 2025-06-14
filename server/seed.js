import pg from "pg"; import dotenv from "dotenv"; dotenv.config();
const db = new pg.Pool({ connectionString: process.env.DB_CONN_STR });
async function doSeeding() { for (let q of [
    `DROP TABLE IF EXISTS test`,
    `CREATE TABLE test (field1 INT)`,
    `INSERT INTO test VALUES (0)`,
  ]) await db.query(q); console.log("Seed data created successfully!");
}
doSeeding();
