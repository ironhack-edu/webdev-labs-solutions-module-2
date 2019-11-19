const express = require('express');
const router = express.Router();

// GET
router.get('/main', (req, res, next) => {
  res.render('main');
});

// GET
router.get('/private', (req, res, next) => {
  res.render('private');
});

module.exports = router;
