
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', (table) => {
    table.increments();
    table.integer('userid');
    table.integer('mapid');
    table.foreign('userid').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('mapid').references('id').inTable('maps').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
