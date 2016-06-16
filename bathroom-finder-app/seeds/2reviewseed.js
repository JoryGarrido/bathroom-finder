exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('reviews').del(),

    // Inserts seed entries
    knex('reviews').insert({
      rating: 4,
      review: "this is the best bathroom evaaaaaar!!!",
      users_id: 1,
      bathrooms_id: 1
    })
  );
};
