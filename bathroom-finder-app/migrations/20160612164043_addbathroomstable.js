
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bathrooms', function(table) {
    table.increments('id').primary();
    table.string('bathroomname').notNullable();
    table.integer('rating').notNullable();
    table.decimal('lat', 12, 8).notNullable();
    table.decimal('lng', 12, 8).notNullable();
    table.integer('users_id').references('id').inTable('users');
    table.string('directions');
    table.string('hours');
    table.boolean('menschangingtable');
    table.boolean('womenschangingtable');
    table.boolean('unisex');
    table.boolean('customersonly');
    table.boolean('private');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bathrooms');
};
