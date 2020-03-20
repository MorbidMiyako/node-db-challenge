const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
}

function find() {
  ""
  return db("projects")
}

function findById(id) {
  return db("projects").where({ id }).first()
}

function findSteps(id) {
  return db.select("*")
    .from("projects")
    .join("steps", "projects.id", "=", "steps.project_id")
    .where("project_id", "=", id)
}

function add(projectData) {
  return db("projects").insert(projectData)
}

function addStep(stepData, id) {
  return db("steps").insert({
    ...stepData,
    project_id: id
  })
}

function update(changes, id) {
  return db("projects")
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db("projects").where("id", "=", id).del()
}

