import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const db = new pg.Pool({ connectionString: process.env.DB_CONN_STR });
async function doSeeding() {
  for (let q of [
    `DROP TABLE IF EXISTS wk7users, wk7posts`,
    `CREATE TABLE wk7users (
      username VARCHAR(40) PRIMARY KEY,
      reputation INT DEFAULT 0
    )`,
    `CREATE TABLE wk7posts (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR(40) NOT NULL REFERENCES wk7users(username),
      when_posted TIMESTAMP DEFAULT now(),
      subject VARCHAR(255) NOT NULL,
      text TEXT
    )`,
    `INSERT INTO wk7users VALUES ('user1'), ('user2'), ('user3')`,
    `INSERT INTO wk7posts (username, subject, text) VALUES
      ('user1', 'My First Post', 'I am so excited to be making my first post!!!'),
      ('user1', 'so confident', 'it''s so relaxing being the most experienced user here'),
      ('user1', 'YAWN!', 'I''m getting really jaded with posting here and might not bother again'),
      ('user2', 'My First Post', 'I''ve been lured in by all the publicity on socials and am also excited to be making my first post. Or as the Romans would say, Lorem Ipsem! I''ve been lured in by all the publicity on socials and am also excited to be making my first post. Or as the Romans would say, Lorem Ipsem FTW!')`,
  ])
    await db.query(q);
  console.log("Seed data created successfully!");
}
doSeeding();
