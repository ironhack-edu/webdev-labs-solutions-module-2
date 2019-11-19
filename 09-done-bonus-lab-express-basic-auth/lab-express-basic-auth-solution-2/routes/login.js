const express = require('express');
const router = express.Router();

// GET '/login'      - Render Login form
router.get('/', (req, res, next) => {
  res.render('auth-views/login');
});

module.exports = router;
