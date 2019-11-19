const express = require('express');
const router = express.Router();

// Routers
const authRouter = require('./auth');
const loginRouter = require('./login');
const signupRouter = require('./signup');

// * '/auth'
router.use('/auth', authRouter);

// * '/login'
router.use('/login', loginRouter);

// * '/signup'
router.use('/signup', signupRouter);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
