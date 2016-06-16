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
    }),
    knex('bathrooms').insert({
      bathroomname: 'Pearl st walking mall',
      rating: 1,
      lat: 40.0182635,
      lng: -105.2785933,
      users_id: 1,
      directions: 'corner of pearl and 13th'
    }),
    knex('bathrooms').insert({
      bathroomname: 'Hallway behind Yellow Deli',
      rating: 5,
      lat: 40.0168749,
      lng: -105.2833636,
      users_id: 1,
      directions: 'Go though yellow deli, out the back, down hallway to the right'
    }),
    knex('bathrooms').insert({
      bathroomname: 'Hallway behind Zoe Ma Ma',
      rating: 3,
      lat: 40.01774439,
      lng: -105.28240096,
      users_id: 1,
      directions: 'Go into Zoe Ma Ma, past restaurant and down the hall to the left'
    }),
    knex('bathrooms').insert({
      bathroomname: 'Pearl Street Pub',
      rating: 2,
      lat: 40.01727193,
      lng: -105.28079834,
      users_id: 1,
      directions: 'Just past back entrance to Pearl Street Pub'
    }),
    knex('bathrooms').insert({
      bathroomname: 'Hallway behind Chipotle/World of Beer',
      rating: 2,
      lat: 40.0174907,
      lng: -105.2833907,
      users_id: 1,
      directions: 'Go though either Chipotle or WoB, no one cares'
    }),
    knex('bathrooms').insert({
      bathroomname: '29th Street Mall',
      rating: 2,
      lat: 40.01869805,
      lng: -105.25531724,
      users_id: 1,
      directions: 'Take staircase between Teavana and Eddie Bauer, turn right at the balcony and go all the way around'
    }),
    knex('bathrooms').insert({
      bathroomname: 'McDonald\'s',
      rating: 2,
      lat: 40.01930915,
      lng: -105.25783114,
      users_id: 1,
      directions: 'Go inside, no one cares'
    }),
    knex('bathrooms').insert({
      bathroomname: 'Target',
      rating: 2,
      lat: 40.02206674,
      lng: -105.2566731,
      users_id: 1,
      directions: 'Just inside on the left, no one cares'
    }),
    knex('bathrooms').insert({
      bathroomname: 'Hallway behind Chipotle/World of Beer',
      rating: 2,
      lat: 39.99876598,
      lng: -105.28250009,
      users_id: 1,
      directions: 'Around the left of the ranger\'s station at Chautauqua'
    })
  );
};
