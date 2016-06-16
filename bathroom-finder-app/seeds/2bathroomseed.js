exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('bathrooms').del(),

    // Inserts seed entries
    knex('bathrooms').insert({
      bathroomname: 'Galvanize 2nd floor',
      rating: 5,
      lat: 40.017835399999996,
      lng: -105.2820569,
      users_id: 1,
      directions: 'down the hall to the right'
    })
  );
};
