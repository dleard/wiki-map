exports.up = (knex, Promise) => {
  return knex.schema.createTable('maps', (table) => {
    table.increments();
    table.string('name');
    table.float('startlat', 8, 3);
    table.float('startlong', 8, 3);
    table.integer('likes');
    table.integer('creatorid').references('id').inTable('users');
  });  
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('maps');
};
