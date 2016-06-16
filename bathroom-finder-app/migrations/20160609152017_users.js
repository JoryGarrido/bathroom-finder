  exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    // table.string('facebookId').unique;
    // table.string('accesstoken');
    table.string('password').notNullable();
    table.boolean('isadmin').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
