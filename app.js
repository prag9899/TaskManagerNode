require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

let tasks = [];

// Health check
app.get('/health', (req, res) => res.status(200).send('Server is healthy'));

// Get all tasks
app.get('/tasks', (req, res) => res.status(200).json(tasks));

// Add new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Title and description required' });
    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

let server;

function startServer(port = process.env.PORT || 3000) {
    return new Promise((resolve) => {
        server = app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
            resolve(server);
        });
    });
}

function stopServer() {
    return new Promise((resolve, reject) => {
        if (!server) return resolve();
        server.close((err) => {
            if (err) return reject(err);
            server = null;
            resolve();
        });
    });
}

module.exports = { app, startServer, stopServer };
