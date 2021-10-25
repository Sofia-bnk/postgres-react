require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const result = await db.query("select * from tasks");

    res.status(200).json({ data: { tasks: result.rows } });
  } catch (err) {
    err;
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const result = await db.query("select * from tasks where id = $1", [
      req.params.id,
    ]);

    res.status(200).json({ data: { task: result.rows[0] } });
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

app.put("/tasks/:id", (req, res) => {
  res.status(200).json({ status: "success", task: "tidy" });
});
app.delete("/tasks/:id", (req, res) => {
  res.status(204).res(req.params.id);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server isa listening on port ${port}`);
});
