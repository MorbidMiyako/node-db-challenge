const express = require('express');
const helmet = require('helmet');

const resourcesRouter = require('./resources/resourcesRouter');
const tasksRouter = require('./tasks/tasksRouter');
const projectsRouter = require('./projects/projectsRouter');

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "API WORKS WOOOO" })
})

server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', tasksRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;
