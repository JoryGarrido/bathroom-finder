// Important stuff:
// 1) Find bathrooms button can't be clickable until location cookies are set!!
// 2) What invokes findBathrooms? A route? If so when and which route?
// 3) findBathrooms must send location to map on main page.
// 4) findBathrooms must pick a set number of the closest bathrooms to display

// KEY:
// d = destination
// o = origin
//   (ie. origin latitude, destination longitude)
// Hi = upper end of range of coordinates
// Lo = lower end of range

require('dotenv').config();
var knex = require('./db/knex');
var request = require('request');

// findBathrooms(40, -105, 0.4);

var oLatHi;
var oLatLo;
var oLngHi;
var oLngLo;

function findBathrooms(oLat, oLng, x, resolve) {
  console.log('running');
  oLat = parseFloat(oLat);
  oLng = parseFloat(oLng);
  console.log(typeof(oLat));

  // CLEVER ALGORITHM
  // 1) use coordinates to generate square range, (ie. rangeUpperLimit = position + 0.05 miles)
  // 2) calculate number of bathrooms at smallest range (ie. 0.1 miles) that fit criteria (if any)
  // 3) if number exceeds desired list length (ie. ten bathrooms), run google distance matrix and return closest
  // 4) if not, rerun at next smallest range (ie. 0.5 miles)

  oLatHi = oLat + x;
  oLatLo = oLat - x;
  oLngHi = oLng + x;
  oLngLo = oLng - x;
  var mode = "walking";

  // SET COORDINATE RANGE TO SEARCH
  knex('bathrooms').whereBetween('lat', [oLatLo, oLatHi]).andWhereBetween('lng', [oLngLo, oLngHi]).then(function(bathrooms) {

    // IF NOT ENOUGH BATHROOMS, WIDEN RANGE, REPEAT UNTIL THERE ARE ENOUGH BATHROOMS
    if (bathrooms.length < 3) {
      findBathrooms(oLat, oLng, resolve, x + 0.1)
    } else {

      // MAKE A SEARCH STRING OF ALL BATHROOM LAT/LNGS
      console.log("rescursion complete");
      var queryLatLngs;
      for (var i = 0; i < bathrooms.length; i++) {
        if (queryLatLngs) {
          queryLatLngs = queryLatLngs + bathrooms[i].lat.toString() + ',';
        } else {
          queryLatLngs = bathrooms[i].lat.toString() + ',';
        }
        if (i < bathrooms.length - 1) {
          queryLatLngs = queryLatLngs + bathrooms[i].lng.toString() + '|';
        } else {
          queryLatLngs = queryLatLngs + bathrooms[i].lng.toString();
        }
      }

      // RUN GOOGLE DISTANCE MATRIX ON EACH BATHROOM
      var ajaxArray = [];
      var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + oLat + ',' + oLng + '&destinations=' + queryLatLngs + '&mode=' + mode + '&language=en-EN&key=' + process.env.GOOGLEMAPS_API_KEY;
      request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          // DISTANCE IN METERS
          var result = JSON.parse(body);
          for (var i = 0; i < bathrooms.length; i++) {
            ajaxArray[i] = [];
            ajaxArray[i][0] = bathrooms[i].id;
            ajaxArray[i][1] = result.rows[0].elements[i].distance.value;
          }
        }

        // SORT BY DISTANCE
        var idDistance = ajaxArray.sort(function(a, b) {
          return a[1] - b[1];
        })

        resolve(idDistance);
      })
    }
  })

  // WORKING
  // knex('bathrooms').then(function(bathrooms) {
  //   var bathroomIDs = [];
  //   for (var i = 0; i < bathrooms.length; i++) {
  //     bathroomIDs[i] = bathrooms[i].id
  //   }
  //   resolve(bathroomIDs);
  // })
}

module.exports = {
  findBathrooms: findBathrooms
}
