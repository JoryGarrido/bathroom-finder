var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  var lat;
  var lng;
  if (req.session.lat) {
    lat = req.session.lat
    lng = req.session.lng
  }
  res.render('index', {user: res.locals.user, lat: lat, lng: lng });
});

// RECEIVES LAT/LNG FROM CLIENT
router.post('/position', function(req, res, next) {
  var lat = req.body.lat.toString();
  var lng = req.body.lng.toString();
  req.session.lat = lat;
  req.session.lng = lng;

  // INVOKE FIND BATHROOMS ALGORITHM
  // findBathrooms.findBathrooms(lat, lng);
  res.render('index');
});

router.get('/main', function(req, res, next) {
  var name = res.locals.user.username;
  console.log("router: " + req.session.lat);
  res.render('main', {lat: req.session.lat, lng: req.session.lng, username: name});
})

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
          console.log(id);
          req.session.id = id;
          res.redirect('/');
        })
        .catch(function(err) {
          next(err);
        });
    })
    .catch(function(err) {
      next(err);
    });
})

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

router.post('/findbathrooms', function (req, res, next){
  res.redirect('main');
});


// REDIRECT MEMBER GOING TO SIGIN/signup


// RENDER VIEW DIFFERENTLY FOR GUEST VS. MEMBER
// function renderGuest(req, res, next) {
//   if (!req.session.id) {
//     res.redirect('/');
//   }
//   next();
// }

module.exports = router;
