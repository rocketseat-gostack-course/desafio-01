/* eslint-disable radix */
const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

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

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(item => parseInt(item.id) === parseInt(id));
  if (index < 0) {
    return res.status(400).json({ error: 'Project does not exists.' });
  }

  const { title } = req.body;
  projects[index].title = title;
  return res.json(projects[index]);
});

server.listen(3000);
