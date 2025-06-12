import express from "express";
import cors from "cors";

// const express = require('express');
let tasks = [];
let done = [];
const app = express();
const PORT = 5000;
// const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ tasks, done });
});

app.post("/submit", (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push({ id: tasks.length + 1, task: task });
    res.json({ message: "Task added!", tasks });
  } else {
    res.status(400).json({ message: "Task is required!" });
  }
});
app.put("/submit/:postion", (req, res) => {
  const { postion } = req.params;
  const { task } = req.body;
  const index = tasks.findIndex((t) => t.id === parseInt(postion));

  if (index !== -1) {
    tasks[index].task = task;
    res.json({ message: "Task updated!", tasks });
  } else {
    res.status(400).json({ message: "Task not found!" });
  }
});

app.post("/done", (req, res) => {
  const { task } = req.body;
  if (task) {
    done.push({ id: done.length + 1, task: task });
    res.json({ message: "Mark done!", done });
  } else {
    res.status(400).json({ message: "Task is required!" });
  }
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.json({ message: "Task removed!", tasks });
});
app.delete("/delete/done/:id", (req, res) => {
  const { id } = req.params;
  done = done.filter((t) => t.id !== parseInt(id));
  res.json({ message: "Task removed!", done });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
