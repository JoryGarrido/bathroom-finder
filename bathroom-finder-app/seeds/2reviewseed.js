exports.seed = function(knex, Promise) {
  return Promise.join(

    // Deletes ALL existing entries
    knex('reviews').del(),
    knex('bathrooms')
    .where({bathroomname: "Galvanize 2nd floor"})
    .first()
    .then(
      function(data){
        var insertData = {
          rating: 4,
          review: 'this is the best bathroom evaaaaaar!!!',
          users_id: 1,
          bathrooms_id: data.id
        }

        knex('reviews').insert(this.insertData).then(function (d) {
          console.log(d);
        })
      })

  );
};
