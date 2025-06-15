import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./utils/dbConnection.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.listen(process.env.APP_PORT);

app.get("/", (req, rsp) => {
  rsp.send(`<h3 style="text-align:center">There is no website here</h3>`);
});

// TODO: STRETCH: GET - get posts filtered by subject or username

const qryGetPosts = `SELECT * FROM wk7posts`;
app.get("/pollComments", async (req, rsp) => {
  try {
    rsp.status(200).json((await db.query(qryGetPosts)).rows);
  } catch (er) {
    console.log(er.message);
    rsp.status(500).json({ success: false }); // return a generic fail wth HTTP 500
  }
});

const qryGetUsers = `SELECT * FROM wk7users`;
app.get("/readUsers", async (req, rsp) => {
  try {
    rsp.status(200).json((await db.query(qryGetUsers)).rows);
  } catch (er) {
    console.log(er.message);
    rsp.status(500).json({ success: false }); // return a generic fail wth HTTP 500
  }
});

const qryEnsureUser = `INSERT INTO wk7users VALUES ($1) ON CONFLICT (username) DO NOTHING`;
app.post("/ensureUser", (req, rsp) => {
  try {
    rsp.status(200).json(db.query(qryEnsureUser, [req.body.username]));
  } catch (er) {
    console.log(er.message);
    rsp.status(500).json({ success: false }); // return a generic fail wth HTTP 500
  }
});

const qryGiveKudos = `UPDATE wk7users SET reputation = reputation + 1 WHERE username = $1`;
app.post("/giveKudos", (req, rsp) => {
  try {
    rsp.status(200).json(db.query(qryGiveKudos, [req.body.username]));
  } catch (er) {
    console.log(er.message);
    rsp.status(500).json({ success: false }); // return a generic fail wth HTTP 500
  }
});

const qryAddComment = `INSERT INTO wk7posts (username, subject, text) VALUES ($1,$2,$3)`;
app.post("/postComment", (req, rsp) => {
  try {
    const { username, subject, text } = req.body;
    rsp.status(200).json(db.query(qryAddComment, [username, subject, text]));
  } catch (er) {
    console.log(er.message);
    rsp.status(500).json({ success: false }); // return a generic fail wth HTTP 500
  }
});

// TODO: Stretch goals only from here on in!
/*
// In an endpoint, we can set up dynamic params using ':', which allows
// us to use params to set the id we're targeting for deletion.
// Sample request: HTTP DELETE to .../delete/6 to delete ids 6+
app.delete("/delete/:fromid", (req, rsp) => {
  try {
    const fromid = req.params.fromid; // Pick up the dynamic param
    if (!(fromid >= 0)) console.log("this won't end well"); // TODO: Check correct usage
    const junk = db.query(`DELETE FROM frogs WHERE id > $1`, [fromid]);
    rsp.status(200).json({ success: true }); // Optionally confirm delete sent to DB correctly
  } catch (er) {
    rsp.status(500).json({ success: false }); // return a generic fail wth HTTP 500
  }
});

// Update is a mix of delete & create: we get the data from the body, and the target from the params
app.put("/put/:atid", (req, rsp) => {
  try {
    const b = req.body;
    const junk = db.query(
      `UPDATE frogs SET name=$1, max_hops=$2, is_poisonous=$3 WHERE id = $4`,
      [b.name, b.max_hops, b.is_poisonous, req.params.atid]
    );
    rsp.status(200).json({ success: true }); // Optionally confirm update sent to DB correctly
  } catch (er) {
    console.log(er.message);
    rsp.status(500).json({ success: false }); // return a generic fail wth HTTP 500
  }
});
*/
