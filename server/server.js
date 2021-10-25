require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

app.get("/tasks", async (req, res) => {
  const result = await db.query("select * from tasks");

  console.log(result);
  res.status(200).json({ status: "success", task: "clean" });
});

app.get("/tasks/:id", (req, res) => {
  res.status(200).send(req.params.id);
});

app.post("/tasks", (req, res) => {
  res.status(201).send(req.body);
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
