require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");

app.use(express.json());
app.use(cors());
app.get("/tasks", async (req, res) => {
  try {
    const result = await db.query("select * from tasks");

    res.status(200).json({ tasks: result.rows });
  } catch (err) {
    err;
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const result = await db.query("select * from tasks where id = $1", [
      req.params.id,
    ]);

    res.status(200).json({ task: result.rows[0] });
  } catch (err) {
    err;
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const result = await db.query(
      "insert into tasks(task_date,day,task) values ($1,$2,$3) returning *", // returning * for sending back the input
      [req.body.task_date, req.body.day, req.body.task]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const result = await db.query(
      "update tasks set task_date=$1, day=$2, task=$3 where id=$4 returning *",
      [req.body.task_date, req.body.day, req.body.task, req.params.id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
});
app.delete("/tasks/:id", async (req, res) => {
  try {
    await db.query("delete from tasks where id=$1", [req.params.id]);

    res.status(204).send(`taske ${req.params.id} is deleted`);
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
