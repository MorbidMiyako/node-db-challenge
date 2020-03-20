const db = require("../../data/db-config");

module.exports = {
  add,
  removeUsingProject,
  removeUsingResource
}

function add(pairData) {
  return db("project_resources").insert({ pairData })
}

function removeUsingResource(id) {
  return db("project_resources").where("resource_id", "=", id).del()
}

function removeUsingProject(id) {
  return db("project_resources").where("project_id", "=", id).del()
}
