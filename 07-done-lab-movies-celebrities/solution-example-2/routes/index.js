const express = require('express');
const router = express.Router();
const users = require('./users');
const celebrities = require('./celebrities');
const movies = require('./movies');

// * 'users'
router.use('/users', users);

// * 'celebrities
router.use('/celebrities', celebrities);

// * 'movies'
router.use('/movies', movies);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
