
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bathrooms', function(table) {
    table.increments('id').primary();
    table.string('bathroomname').notNullable();
    table.integer('rating').notNullable();
    table.float('lat').notNullable();
    table.float('lng').notNullable();
    table.string('directions');
    table.boolean('menschangingtable');
    table.boolean('womanschangingtable');
    table.boolean('unisex');
    table.boolean('customersonly');
    table.boolean('private');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bathrooms');
};
