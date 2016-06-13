exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('bathrooms').del(),

    // Inserts seed entries
    knex('bathrooms').insert({
      id: 1,
      bathroomname: 'Galvanize 2nd floor',
      rating: 5,
      lat: 40.017835399999996,
      lng: -105.2820569,
      users_id: 1,
      directions: 'down the hall to the right'
    }),
    knex('bathrooms').insert({
      id: 2,
      bathroomname: 'Pearl st walking mall',
      rating: 1,
      lat: 40.0182635,
      lng: -105.2785933,
      users_id: 1,
      directions: 'corner of pearl and 13th'
    }),
    knex('bathrooms').insert({
      id: 3,
      bathroomname: 'Hallway behind Yellow Deli',
      rating: 5,
      lat: 40.0168749,
      lng: -105.2833636,
      users_id: 1,
      directions: 'Go though yellow deli, out the back, down hallway to the right'
    })
  );
};
