const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  findResources,
  findTasks,
  add,
  update,
  remove,
}

function find() {
  return db("projects")
}

function findById(id) {
  return db("projects").where({ id }).first()
}

function findResources(id) {
  return db.select("*")
    .from("resources")
    .join("project_resources", "resources.id", "=", "project_resources.resource_id")
    .where("project_id", "=", id)
}

function findTasks(id) {
  return db.select("*")
    .from("tasks")
    .where("project_id", "=", id)
}

function add(projectData) {
  return db("projects").insert(projectData)
}

function update(changes, id) {
  return db("projects")
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db("projects").where("id", "=", id).del()
}
