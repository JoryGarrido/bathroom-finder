  exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('fb_id').unique();
    table.string('fb_displayname');
    table.string('fb_accesstoken');
    table.string('password').notNullable();
    table.boolean('isadmin').notNullable().defaultTo(false);
    table.boolean('isactive').notNullable().defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
