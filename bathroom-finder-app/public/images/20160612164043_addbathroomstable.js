
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bathrooms', function(table) {
    table.increments('id').primary();
    table.string('bathroomName').notNullable();
    table.integer('rating').notNullable();
    table.float('lat').notNullable();
    table.float('lng').notNullable();
    table.string('directions');
    table.boolean('mensChangingTable');
    table.boolean('womansChangingTable');
    table.boolean('unisex');
    table.boolean('customersOnly');
    table.boolean('private');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bathrooms');
};
