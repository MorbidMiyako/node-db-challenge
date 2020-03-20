
exports.seed = function (knex) {
  return knex('tasks').insert([
    { id: 1, description: 'npx create', notes: "some extra info", project_id: 1, completed: false },
    { id: 2, description: 'import axios', notes: "some extra info", project_id: 1, completed: false },
    { id: 3, description: 'understand sql', notes: "some extra info", project_id: 2, completed: false },
    { id: 4, description: 'open book', notes: "some extra info", project_id: 3, completed: false },
    { id: 5, description: 'launch vscode', notes: "some extra info", project_id: 1, completed: false },
  ]);
};
