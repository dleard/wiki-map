
exports.up = function(knex, Promise) {
  return knex.schema.createTable('markers', (table) => {
    table.increments();
    table.string('name');
    table.string('address');
    table.float('lat', 8, 3);
    table.float('long,', 8, 3);
    table.string('type');
    table.string('imgsrc');
    table.integer('contributorid');
    table.integer('mapid');
    table.foreign('contributorid').references('id').inTable('users').onDelete('cascade');
    table.foreign('mapid').references('id').inTable('maps').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('markers');
};
