var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', redirectGuest, function(req, res, next) {
  res.render('users', {user: res.locals.user});
});

function redirectGuest(req, res, next) {
  if (!req.session.id) {
    res.redirect('/');
  }
  next();
}

module.exports = router;
