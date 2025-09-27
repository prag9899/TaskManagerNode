const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let tasks = [];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// Add a task
app.post('/tasks', (req, res) => {
  const task = { id: tasks.length + 1, ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

// Basic server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; // For Jest testing
