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
  return db("tasks")
}

function findById(id) {
  return db("tasks").where({ id }).first()
}

function findSteps(id) {
  return db.select("*")
    .from("tasks")
    .join("steps", "tasks.id", "=", "steps.task_id")
    .where("task_id", "=", id)
}

function add(taskData) {
  return db("tasks").insert(taskData)
}

function addStep(stepData, id) {
  return db("steps").insert({
    ...stepData,
    task_id: id
  })
}

function update(changes, id) {
  return db("tasks")
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db("tasks").where("id", "=", id).del()
}

