const db = require("../../data/db-config");

module.exports = {
  findProjects,
  findProjectById,
  findProjectResources,
  findProjectTasks,
  addProject,
  addProject,
  updateProject,
  removeProject,
  findTasks,
  findTaskById,
  addTask,
  addTask,
  updateTask,
  removeTask,
  findResources,
  findResourceById,
  findResourceProjects,
  addResource,
  addResource,
  updateResource,
  removeResource,
}

function findProjects() {
  return db("projects")
}

function findProjectById(id) {
  return db("projects").where({ id }).first()
}

function findProjectResources(id) {
  return db.select("*")
    .from("resources")
    .join("project_resources", "resources.id", "=", "project_resources.project_id")
    .where("project_id", "=", id)
}

function findProjectTasks(id) {
  return db.select("*")
    .from("tasks")
    .where("project_id", "=", id)
}

function addProject(projectData) {
  return db("projects").insert(projectData)
}

function updateProject(changes, id) {
  return db("projects")
    .where({ id })
    .update(changes)
}

function removeProject(id) {
  return db("projects").where("id", "=", id).del()
}

function findTasks() {
  return db("tasks")
}

function findTaskById(id) {
  return db("tasks").where({ id }).first()
}

function addTask(taskData) {
  return db("tasks").insert({ taskData })
}

function updateTask(changes, id) {
  return db("tasks")
    .where({ id })
    .update(changes)
}

function removeTask(id) {
  return db("projects").where("id", "=", id).del()
}

function findResources() {
  return db("resources")
}

function findResourceById(id) {
  return db("resources").where({ id }).first()
}

function findResourceProjects(id) {
  return db.select("*")
    .from("projects")
    .join("project_resources", "projects.id", "=", "project_resources.resource_id")
    .where("resource_id", "=", id)
}


function addResource(resourceData) {
  return db("resources").insert({ taskData })
}

function updateResource(changes, id) {
  return db("resources")
    .where({ id })
    .update(changes)
}

function removeResource(id) {
  return db("resources").where("id", "=", id).del()
}
