const passport =require('passport');
const User = require('../../models/user-model');
// require connect-flash for flash messages
const flash = require('connect-flash');

/////// REQUIRE ALL THE STRATEGIES ////////////
require('./local-strategy');
require('./slack-strategy');
require('./google-strategy');
///////////////////////////////////////////////

// serializeUser => what to be saved in the session
                           // cb stands for callback
passport.serializeUser((user, cb) => {
  // null === no errors, all good
  cb(null, user._id); // ==> save user id into session
});

// deserializeUser => retrieve user's data from the database
// this function gets called every time we request for a user (every time when we need req.user)
passport.deserializeUser((userId, cb) => {
    User.findById(userId)
    .then(user => {
      cb(null, user);
    })
    .catch( err => cb(err));
})

function passportBasicSetup(blah){

  // passport super power is here:
  blah.use(passport.initialize()); // <== 'fires' the passport package
  blah.use(passport.session()); // <== connects passport to the session
  // to activate flash messages:
  blah.use(flash());
  blah.use((req, res, next) => {
    res.locals.messages = req.flash();
    if(req.user){
      res.locals.currentUser = req.user; // <== make currentUser variable available in all hbs whenever we have user in the session
    }
    next();
  })
}

module.exports = passportBasicSetup;
