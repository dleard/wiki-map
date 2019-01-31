exports.up = (knex, Promise) => {
  return knex.schema.createTable('maps', (table) => {
    table.increments();
    table.string('name');
    table.float('startlat', 8, 3);
    table.float('startlong', 8, 3);
    table.integer('likes');
    table.string('type');
    table.integer('creatorid');
    table.foreign('creatorid').references('id').inTable('users').onDelete('cascade');
  });  
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('maps');
};
