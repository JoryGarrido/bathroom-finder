var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: res.locals.user});
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
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

router.get('/signin', function(req, res, next) {
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
        res.redirect('/');
      } else {
        res.render('signinfail')
      }
    });
});

router.get('/signout', function (req, res, next) {
  req.session = null;
  res.redirect('/');
})


// REDIRECT MEMBER GOING TO SIGIN/signup


// RENDER VIEW DIFFERENTLY FOR GUEST VS. MEMBER
// function renderGuest(req, res, next) {
//   if (!req.session.id) {
//     res.redirect('/');
//   }
//   next();
// }

module.exports = router;
