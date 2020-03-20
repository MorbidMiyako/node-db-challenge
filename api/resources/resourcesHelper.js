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
  return db("resources")
}

function findById(id) {
  return db("resources").where({ id }).first()
}

function findSteps(id) {
  return db.select("*")
    .from("resources")
    .join("steps", "resources.id", "=", "steps.resource_id")
    .where("resource_id", "=", id)
}

function add(resourceData) {
  return db("resources").insert(resourceData)
}

function addStep(stepData, id) {
  return db("steps").insert({
    ...stepData,
    resource_id: id
  })
}

function update(changes, id) {
  return db("resources")
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db("resources").where("id", "=", id).del()
}

