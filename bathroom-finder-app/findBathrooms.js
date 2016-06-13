// Important stuff:
// 1) Find bathrooms button can't be clickable until location cookies are set!!
// 2) What invokes findBathrooms? A route? If so when and which route?
// 3) findBathrooms must send location to map on main page.
// 4) findBathrooms must pick a set number of the closest bathrooms to display

var knex = require('./db/knex');

findBathrooms(40.017835399999996, -105.2820569);

function findBathrooms(cLat, cLng) {
  // console.log("working");
  // console.log(lat);
  // console.log(lng);

  // CLEVER ALGORITHM
  // 1) use coordinates to generate square range, (ie. rangeUpperLimit = position + 0.05 miles)
  // 2) calculate number of bathrooms at smallest range (ie. 0.1 miles) that fit criteria (if any)
  // 3) if number exceeds desired list length (ie. ten bathrooms), run google distance matrix and return closest
  // 4) if not, rerun at next smallest range (ie. 0.5 miles)

  var cLatHi = cLat + 1;
  var cLatLo = cLat - 1;
  var cLngHi = cLng + 1;
  var cLngLo = cLng - 1;

  console.log(cLatHi);
  console.log(typeof(cLatHi));
  console.log(cLatLo);
  console.log(typeof(cLatLo));

  knex('bathrooms').where('id', 1).first().then(function(bathroom){
  // knex('bathrooms').where('lat', [cLatHi, cLatLo]).andWhere('lng', [cLngHi, cLngLo]).first().then(function(bathroom){
  // knex('bathrooms').where({lat: [cLatHi, cLatLo], lng: [cLngHi, cLngLo]}).first().then(function(bathroom){
    console.log(bathroom);
  })
}

// module.exports = {
//   findBathrooms: findBathrooms
// }
