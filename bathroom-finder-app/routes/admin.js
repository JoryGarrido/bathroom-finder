require('dotenv').config();
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');

var knex = require('../db/knex');
var findBathrooms = require('../findBathrooms')

router.get('/', verifyAdmin, function(req, res, next) {
  res.render('admin');
})

router.get('/users', verifyAdmin, function(req, res, next) {
  knex('users').then(function(users) {
    res.render('adminusers', {
      users: users
    })
  })
})

router.get('/bathrooms', verifyAdmin, function(req, res, next) {
  knex('bathrooms').then(function(bathrooms) {
    res.render('adminbathrooms', {
      bathrooms: bathrooms
    })
  })
})

router.get('/reviews', verifyAdmin, function(req, res, next) {
  knex('reviews').then(function(reviews) {
    res.render('adminusers', {
      reviews: reviews
    })
  })
})

router.get('/users/:id/delete', verifyAdmin, function(req, res, next) {
  knex('users').where('id', req.params.id).delete().then(function() {
    res.redirect('/admin/users');
  });
})

router.get('/bathrooms/:id/delete', verifyAdmin, function(req, res, next) {
  knex('bathrooms').where('id', req.params.id).delete().then(function() {
    res.redirect('/admin/bathrooms');
  });
})

router.get('/reviews/:id/delete', verifyAdmin, function(req, res, next) {
  knex('reviews').where('id', req.params.id).delete().then(function() {
    res.redirect('/admin/reviews');
  });
})

router.get('/bathrooms/:id/edit', function(req, res, next) {
  knex('bathrooms').where('id', req.params.id).first().then(function(bathroom) {
    res.render('admineditbathrooms', { bathroom: bathroom });
  })
});

router.post('/bathrooms/:id/post', function(req, res, next) {
  if (req.body.mensChangingTable === "false") {
    req.body.mensChangingTable = false
  }
  if (req.body.womensChangingTable === "false") {
    req.body.womensChangingTable = false
  }
  if (req.body.unisex === "false") {
    req.body.unisex = false
  }
  if (req.body.customersOnly === "false") {
    req.body.customersOnly = false
  }
  if (req.body.private === "false") {
    req.body.private = false
  }
  if (req.body.mensChangingTable === "true") {
    req.body.mensChangingTable = true
  }
  if (req.body.womensChangingTable === "true") {
    req.body.womensChangingTable = true
  }
  if (req.body.unisex === "true") {
    req.body.unisex = true
  }
  if (req.body.customersOnly === "true") {
    req.body.customersOnly = true
  }
  if (req.body.private === "true") {
    req.body.private = true
  }
  console.log(req.params);
  // knex('bathrooms').where('id', req.params.id).first().update(
  //   bathroomname: req.body.bathroomname,
  //   rating: 4,
  //   lat: req.session.lat,
  //   lng: req.session.lng,
  //   users_id: req.session.id,
  //   directions: req.body.directions,
  //   menschangingtable: req.body.menschangingTable,
  //   womanschangingtable: req.body.womenschangingtable,
  //   unisex: req.body.unisex,
  //   customersonly: req.body.customersonly,
  //   private: req.body.private
  // ).then(function() {
  //   res.redirect('/admin/bathrooms');
  // });
});

router.get('/reviews/:id/edit', function(req, res, next) {
  knex('reviews').where('id', req.params.id).first().then(function(bathroom) {
    res.render('admineditreviews', {
      bathroom: bathroom
    });
  })
});

router.post('/reviews/:id/edit', function(req, res, next) {
  knex('reviews').where('id', req.params.id).update(req.body).then(function() {
    res.redirect('/admin/reviews');
  });
});

function verifyAdmin(req, res, next) {
  if (!req.session.id) {
    // if (res.locals.user.isAdmin === true) {
    res.redirect('/');
  }
  next();
}


module.exports = router;
