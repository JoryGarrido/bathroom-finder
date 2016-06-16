// Update with your config settings.

module.exports = {

  development: {
    client: 'postgres',
    connection: 'postgres://localhost:5432/bathrooms'
  },
  production: {
    client: 'postgres',
    connection: 'https://pottyspotter.herokuapp.com:5432/bathrooms'
  },
  useNullAsDefault: true,
};
