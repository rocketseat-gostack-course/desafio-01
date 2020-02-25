/* eslint-disable radix */
const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let req_count = 0;

function projectExists(req, res, next) {
  const { id } = req.params;
  const index = projects.findIndex(item => parseInt(item.id) === parseInt(id));
  if (index < 0) {
    return res.status(400).json({ error: 'Project does not exists.' });
  }
  req.projectIndex = index;
  return next();
}

server.use((req, res, next) => {
  req_count += 1;
  // eslint-disable-next-line no-console
  console.log(`Request count: ${req_count.toString()}`);
  next();
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const exists = projects.filter(item => item.id === id);
  if (exists.length > 0) {
    return res.status(400).json({ error: 'Project already exists.' });
  }
  projects.push({ id, title, tasks: [] });
  return res.json(projects);
});

server.put('/projects/:id', projectExists, (req, res) => {
  const { title } = req.body;
  projects[req.projectIndex].title = title;
  return res.json(projects[req.projectIndex]);
});

server.delete('/projects/:id', projectExists, (req, res) => {
  projects.splice(req.projectIndex, 1);
  return res.json(projects);
});

server.post('/projects/:id/tasks', projectExists, (req, res) => {
  const { title } = req.body;
  projects[req.projectIndex].tasks.push(title);
  return res.json(projects[req.projectIndex]);
});

server.listen(3000);
