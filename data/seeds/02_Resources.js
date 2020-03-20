
exports.seed = function (knex) {
  return knex('resources').insert([
    { id: 1, name: 'react', description: "generic stuff" },
    { id: 2, name: 'axios', description: "generic stuff" },
    { id: 3, name: 'sql', description: "generic stuff" },
    { id: 4, name: 'vs code', description: "generic stuff" },
    { id: 5, name: 'a book', description: "generic stuff" },
    { id: 6, name: 'a brain', description: "generic stuff" }
  ]);
};
