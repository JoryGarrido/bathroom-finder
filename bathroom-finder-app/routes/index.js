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

    ////////////////// UNCOMMENT IF MAIN PAGE DOESN'T WORK \\\\\\\\\\\\\\\\\\\\\\\
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
  var bathArr = req.session.bathrooms || [];
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
  var bathArr = req.session.bathrooms || [];
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
      res.redirect('/main');
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
  if(req.body.mensChangingTable === "true"){
    req.body.mensChangingTable = true
  }
  if(req.body.womensChangingTable === "true"){
    req.body.womensChangingTable = true
  }
  if(req.body.unisex === "true"){
    req.body.unisex = true
  }
  if(req.body.customersOnly === "true"){
    req.body.customersOnly = true
  }
  if(req.body.private === "true"){
    req.body.private = true
  }

  knex('bathrooms')
  .insert({
    bathroomname: req.body.bathroomname,
    rating: 4,
    lat: req.session.lat,
    lng: req.session.lng,
    users_id: req.session.id,
    directions: req.body.directions,
    menschangingtable: req.body.menschangingtable,
    womenschangingtable: req.body.womenschangingtable,
    unisex: req.body.unisex,
    customersonly: req.body.customersonly,
    private: req.body.private
  }).then(function(){
    res.redirect('/main');
  })
})

// RENDER VIEW DIFFERENTLY FOR GUEST VS. MEMBER/ADMIN
// function verifyUser(req, res, next) {
//   if (!req.session.id) {
//     res.redirect('/');
//   }
//   next();
// }


router.get('/moreinfo/:id', function(req, res, next){
  knex('bathrooms').where('id', req.params.id).then(function(bathrooms) {
    console.log(bathrooms);
    res.render('moreinfo', {
      bathroomInfo: bathrooms[0],
      id: req.params.id
    });
  })
});


router.get('/addcomment', function(req, res, next){
  res.render('')
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/connect/facebook', passport.authorize('facebook', { scope : ['emails'] }));


router.get('/auth/facebook/callback/', passport.authenticate('facebook', { successRedirect: '/main', failureRedirect: '/users' }));


module.exports = router;
