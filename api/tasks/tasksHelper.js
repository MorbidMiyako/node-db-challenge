const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
}

function find() {
  return db("tasks")
}

function findById(id) {
  return db("tasks").where({ id }).first()
}

function add(taskData) {
  return db("tasks").insert(taskData)
}

function update(changes, id) {
  return db("tasks")
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db("tasks").where("id", "=", id).del()
}

