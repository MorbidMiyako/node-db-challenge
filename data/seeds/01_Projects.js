
exports.seed = function (knex) {
  return knex('projects').insert([
    { id: 1, name: 'Create site', description: "easy stuff", completed: false },
    { id: 2, name: 'build database', description: "fun stuff", completed: false },
    { id: 3, name: 'find wally', description: "foud him", completed: false }
  ]);
};
