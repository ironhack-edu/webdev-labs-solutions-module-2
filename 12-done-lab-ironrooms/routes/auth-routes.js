const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user-model');

const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  // renders the page with the sign up form from the "views/auth" folder
  res.render('auth/signup');
})

//<form action="/register" method="POST">
//                |
//                V
router.post('/register', (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userFullName = req.body.fullName;

  // if any of the following fields are left empty, send warning to users
  if(userEmail == '' || userPassword == '' || userFullName == ''){
    req.flash('error', 'Please fill all the fields.');

    // and render the form again
    res.render('auth/signup');

    // we return because we want to to stop execution on this route until user submits the data so we can proceed
    return;
  }


  // find user by inputted email
  User.findOne({ email: userEmail })
  .then(foundUser => {
    // if you find user already saved in the DB with the same email, send them warning
    if(foundUser !==null){
      req.flash('error', 'Sorry, there is already user with the same email!');
      // here we will redirect to '/login' since they already have profile (they are in the DB)
      res.redirect('/login');
      return;
    }


    // if there's no user with the email they just input, proceed to saving user in the DB
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPassword = bcrypt.hashSync(userPassword, salt);

      User.create({
        email: userEmail,
        password: hashPassword,
        fullName: userFullName
      })
      .then(user => {
        // if all good, log in the user automatically
          req.login(user, (err) => {
            if(err){
              // req.flash.error = 'some message here'
              req.flash('error', 'Auto login does not work so please log in manually ✌🏻');
              res.redirect('/login');
              return;
            }
            res.redirect('/private');
          })
      })
      .catch( err => next(err)); //closing User.create()
  })
  .catch( err => next(err)); // closing User.findOne();
});

//////////////// LOGIN /////////////////////
router.get('/login', (req, res, next) => {
  // renders the page with the login up form from the "views/auth" folder
  res.render('auth/login');
});

// we use passport.authenticate() method with local strategy to verify user's credentials and let them login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/private', // <== successfully logged in
  failureRedirect: '/login', // <== login failed so go to '/login' to try again
  failureFlash: true,
  passReqToCallback: true
}));

//////////////// LOGOUT /////////////////////

router.post('/logout', (req, res, next) => {
  req.logout(); // <== .logout() method comes from passport and takes care of the destroying the session for us
  res.redirect('/login');
})

//////////////// SLACK LOGIN /////////////////////
router.get('/slack-login', passport.authenticate('slack'));

//   callbackURL: '/slack/callback' => from 'slack-strategy.js'
router.get('/slack/callback', passport.authenticate('slack', {
  successReturnToOrRedirect:'/private',
  successFlash:'Slack login successful!',
  failureRedirect:'/login',
  failureMessage:'Slack login failed. Pease try to login manually. 🙏🏻'
}))

//////////////// GOOGLE LOGIN /////////////////////

router.get("/google-login", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "/private",
  successMessage: 'Google login successful!',
  failureRedirect: "/login",
  failureMessage: 'Google login failed. Please try to login manually.'
}));



module.exports = router;
