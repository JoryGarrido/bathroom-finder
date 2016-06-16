
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments('id').primary();
    table.integer('rating').notNullable();
    table.string('review', 1000);
    table.integer('votes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('users_id').references('id').inTable('users');
    table.integer('bathrooms_id').references('id').inTable('bathrooms');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
