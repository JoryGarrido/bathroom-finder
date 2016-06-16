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
  var menschangingtable;
  var womenschangingtable;
  var unisex;
  var customersonly;
  var isprivate;

  if (req.body.menschangingtable === "false") {
    menschangingtable = false
  }
  if (req.body.womenschangingtable === "false") {
    womenschangingtable = false
  }
  if (req.body.unisex === "false") {
    unisex = false
  }
  if (req.body.customersonly === "false") {
    customersonly = false
  }
  if (req.body.private === "false") {
    isprivate = false
  }
  if (req.body.menschangingtable === "true") {
    menschangingtable = true
  }
  if (req.body.womenschangingtable === "true") {
    womenschangingtable = true
  }
  if (req.body.unisex === "true") {
    unisex = true
  }
  if (req.body.customersonly === "true") {
    customersonly = true
  }
  if (req.body.private === "true") {
    isprivate = true
  }
  console.log(menschangingtable);
  console.log(typeof(menschangingtable));

  knex('bathrooms').where('id', req.params.id).update({
    bathroomname: req.body.bathroomname,
    directions: req.body.directions,
    menschangingtable: menschangingtable,
    womenschangingtable: womenschangingtable,
    unisex: unisex,
    customersonly: customersonly,
    private: isprivate
}).then(function() {
    res.redirect('/admin/bathrooms');
  });
});

router.get('/reviews/:id/edit', verifyAdmin, function(req, res, next) {
  knex('reviews').where('id', req.params.id).first().then(function(bathroom) {
    res.render('admineditreviews', {
      bathroom: bathroom
    });
  })
});

router.post('/reviews/:id/edit', verifyAdmin, function(req, res, next) {
  knex('reviews').where('id', req.params.id).update(req.body).then(function() {
    res.redirect('/admin/reviews');
  });
});

function verifyAdmin(req, res, next) {
  if (!req.session.id || res.locals.user.isadmin === false) {
    res.redirect('/');
  }
  next();
}


module.exports = router;
