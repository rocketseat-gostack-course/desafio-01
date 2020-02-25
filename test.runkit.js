/**
 * URL: https://runkit.com/marceloxp/desafio-01-desafios-do-curso-gostack-da-rocketseat
 */

const axios = require("axios")

function getApiUrl(p_route) {
    return process.env.RUNKIT_ENDPOINT_URL + p_route;
}

async function getProjects() {
  try {
    const response = await axios.get(getApiUrl('/projects'));
    console.log('List projects', response.data);
  } catch (error) {
    console.error(error);
  }
}

async function addProject(id, title) {
  try {
    const data = {
        "id": id,
        "title": title
    };
    const response = await axios.post(getApiUrl('/projects'), data);
    console.log('Add project ' + id.toString(), response.data);
  } catch (error) {
    console.error(error);
  }
}

async function addTaskToProject(id, task) {
  try {
    const data = {
        "title": task
    };
    const response = await axios.post(getApiUrl('/projects/' + id.toString() + '/tasks'), data);
    console.log('Add task to project ' + id.toString(), response.data);
  } catch (error) {
    console.error(error);
  }
}

async function deleteProject(id) {
  try {
    const response = await axios.delete(getApiUrl('/projects/' + id));
    console.log('Delete project ' + id.toString(), response.data);
  } catch (error) {
    console.error(error);
  }
}

await getProjects();
await addProject(1, 'Projeto 01');
await addProject(2, 'Projeto 02');
await addProject(2, 'Projeto 02');
await addProject(3, 'Projeto 03');
await addTaskToProject(1, 'Tarefa do Projeto 01');
await addTaskToProject(2, 'Tarefa do Projeto 02');
await addTaskToProject(3, 'Tarefa do Projeto 03');
await getProjects();
await deleteProject(2);
