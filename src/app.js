const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(201).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body

  const data = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(data)

  return response.status(201).json(data)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id == id)

  if(repositoryIndex < 0 ){
    response.status(400).json({error: 'Repository not found'})
  }

  repositories[repositoryIndex].title = title
  repositories[repositoryIndex].url = url
  repositories[repositoryIndex].techs = techs

  response.status(200).json(repositories[repositoryIndex])
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0 ){
    response.status(400).json({error: 'Repository not found'})
  }

  repositories.splice(repositoryIndex, 1) 
  response.send(204)
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0 ){
    response.status(400).json({error: 'Repository not found'})
  }

  repositories[repositoryIndex].likes = repositories[repositoryIndex].likes + 1

  response.status(200).json(repositories[repositoryIndex])
});

module.exports = app;
