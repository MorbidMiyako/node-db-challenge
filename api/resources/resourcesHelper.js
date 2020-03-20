const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  findProjects,
  add,
  update,
  remove,
}

function find() {
  return db("resources")
}

function findById(id) {
  return db("resources").where({ id }).first()
}

function findProjects(id) {
  return db.select("*")
    .from("projects")
    .join("project_resources", "projects.id", "=", "project_resources.resource_id")
    .where("resource_id", "=", id)
}


function add(resourceData) {
  console.log(resourceData)
  return db("resources").insert(resourceData)
}

function update(changes, id) {
  return db("resources")
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db("resources").where("id", "=", id).del()
}
