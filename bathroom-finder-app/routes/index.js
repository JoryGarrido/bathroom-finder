require('dotenv').config();
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');

var knex = require('../db/knex');
var findBathrooms = require('../findBathrooms')

router.get('/', function(req, res, next) {
  var lat;
  var lng;
  var name = res.locals.user.username;
  if (req.session.lat) {
    lat = req.session.lat
    lng = req.session.lng
  }
  res.render('index',
    {
      user: res.locals.user,
      lat: lat,
      lng: lng,
      username: name
     });
});

// RECEIVE LAT/LNG FROM CLIENT
router.post('/position', function(req, res, next) {
  var lat = req.body.lat.toString();
  var lng = req.body.lng.toString();
  // SET CURRENT LOCATION COOKIE
  req.session.lat = lat;
  req.session.lng = lng;
  // INVOKE FIND BATHROOMS ALGORITHM
  var promise = new Promise(function(resolve, reject) {
    findBathrooms.findBathrooms(lat, lng, 0.1, resolve);
  })
  // RECEIVE ARRAY OF IDS/DISTANCES OF CLOSEST BATHROOMS, ADD TO COOKIE
  promise.then(function(bathroomIDs) {
    req.session.bathrooms = bathroomIDs;
    res.redirect('/main');
  })
});

router.get('/main', function(req, res, next) {
  var name = res.locals.user.username;
  var bathArr = req.session.bathrooms;
  var IDs = [];
  var sendArray = [];
  for (var i = 0; i < bathArr.length; i++) {
    IDs[i] = bathArr[i][0];
  }
  knex('bathrooms').whereIn('id', IDs).then(function(bathrooms) {
    // ORDER BATHROOMS ARRAY BASED ON DISTANCES, ADD DISTANCES TO ARRAY
    for (var i = 0; i < bathArr.length; i++) {
      for (var j = 0; j < bathrooms.length; j++) {
        if (bathrooms[j].id === bathArr[i][0]) {
          bathrooms[j].distance = bathArr[i][1];
          sendArray.push(bathrooms[j]);
        }
      }
    }
    res.render('main', {
      lat: req.session.lat,
      lng: req.session.lng,
      key: process.env.GOOGLEMAPS_API_KEY,
      username: name,
      bathrooms: sendArray
    });
  })
})

router.get('/bathrooms', function (req, res, next) {
  var object;
  var name = res.locals.user.username;
  var bathArr = req.session.bathrooms;
  var lat = req.session.lat;
  var lng = req.session.lng;
  var IDs = [];
  var sendArray = [];
  for (var i = 0; i < bathArr.length; i++) {
    IDs[i] = bathArr[i][0];
  }
  knex('bathrooms').whereIn('id', IDs).then(function(bathrooms) {
    // ORDER BATHROOMS ARRAY BASED ON DISTANCES, ADD DISTANCES TO ARRAY
    for (var i = 0; i < bathArr.length; i++) {
      for (var j = 0; j < bathrooms.length; j++) {
        if (bathrooms[j].id === bathArr[i][0]) {
          sendArray.push(bathrooms[j]);
          bathrooms[j].distance = bathArr[i][1];
        }
      }
    }
    console.log(name);
    res.json({ bathrooms: sendArray, name: name, lat: lat, lng: lng});
  })
});

router.post('/signup', function(req, res, next) {
  var password = bcrypt.hashSync(req.body.password, 8);
  knex('users')
    .where({username: req.body.username.toLowerCase()})
    .then(function(data) {
      if (data.length) {
        res.render('signuperror');
      }
      knex('users')
        .insert({
          username: req.body.username.toLowerCase(),
          password: password
        })
        .returning('id')
        .then(function(input){
          return Promise.resolve(Array.isArray(input) ? input[0] : input);
        })
        .then(function(id) {
          req.session.id = id;
          res.redirect('/main');
        })
        .catch(function(err) {
          next(err);
        });
    })
    .catch(function(err) {
      next(err);
    });
})

router.post('/signuperror', function(req, res, next){
  res.render('/main');
});

router.get('/signin', function(req,res,next){
  res.render('signin');
});

router.post('/signin', function(req, res, next) {
  knex('users')
    .where({username: req.body.username.toLowerCase()})
    .first()
    .then(function(data) {
      if (!data) {
        res.render('signinfail')
      }
      if (bcrypt.compareSync(req.body.password, data.password)) {
        req.session.id = data.id;
        res.redirect('/main');
      } else {
        res.render('signinfail')
      }
    });
});

router.post('/signout', function (req, res, next) {
  req.session = null;
  res.redirect('/');
});

// Trying to get moreinfo page to populate

router.get('/moreinfo', function(req, res, next){
  res.render('moreinfo');
})


router.get('/addbathroom', function(req, res, next){
  res.render('addbathroom');
})

router.post('/addbathroom', function(req, res, next){
  console.log(req.body);

  if(req.body.mensChangingTable === "false"){
    req.body.mensChangingTable = false
  }
  if(req.body.womensChangingTable === "false"){
    req.body.womensChangingTable = false
  }
  if(req.body.unisex === "false"){
    req.body.unisex = false
  }
  if(req.body.customersOnly === "false"){
    req.body.customersOnly = false
  }
  if(req.body.private === "false"){
    req.body.private = false
  }

  knex('bathrooms')
  .insert({
    bathroomname: req.body.bathroomName,
    rating: 4,
    lat: 4.3,
    lng: 4.2,
    users_id: 1,
    directions: req.body.directions,
    menschangingtable: req.body.mensChangingTable,
    womanschangingtable: req.body.womensChangingTable,
    unisex: req.body.unisex,
    customersonly: req.body.customersOnly,
    private: req.body.private
  }).then(function(){
    res.redirect('/');
  })
})
  // if(req.body.menschangingtable == "true"){
  //   req.body.menschangingtable = true;
  // }
  // else if(req.body.menschangingtable == "false"){
  //   req.body.menschangingtable= false;
  // }
  // else{
  //   req.body.menschangingtable = null;
  // }
  // console.log(req.body);
  // console.log(typeof(req.body.menschangingtable));
  // console.log(req.session.lat);
  // console.log(typeof(req.session.lng));
  // knex('bathrooms')
  // .insert({
  //   bathroomname: req.body.bathroomname.toLowerCase(),
  //   rating: 5,
  //   lat: parseFloat(req.session.lat),
  //   lng: parseFloat(req.session.lng),
  //   user_id: 1,
  //   directions: req.body.directions.toLowerCase(),
  //   menschangingtable: req.body.menschangingtable
  //   // womanschangingtable: req.body.womenschangingtable,
  //   // unisex: req.body.unisex,
  //   // customersonly: req.body.customersonly,
  //   // private: req.body.private
  // }).then(function(){
  //
  //   res.redirect('/main');
  // }).catch(function(e) {
  //   console.log(e);
  // })
// })


router.get('/admin', verifyAdmin, function(req, res, next) {
  res.render('admin', {title: "Admin page"});
})

// RENDER VIEW DIFFERENTLY FOR GUEST VS. MEMBER/ADMIN
// function verifyUser(req, res, next) {
//   if (!req.session.id) {
//     res.redirect('/');
//   }
//   next();
// }

function verifyAdmin(req, res, next) {
  if (!req.session.id) {
  // if (res.locals.user.isAdmin === true) {
    res.redirect('/');
  }
  knex('bathrooms').then(function(bathrooms) {
    res.render('admin', {bathrooms: bathrooms})
  })
  // next();
}


router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/connect/facebook', passport.authorize('facebook', { scope : ['email'] }));


router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/main', failureRedirect: '/users' }));


module.exports = router;
