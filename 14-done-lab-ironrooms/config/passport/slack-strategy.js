const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
// we don't need bcrypt because we won't be dealing with any passwords

const User = require('../../models/user-model');

passport.use(new SlackStrategy({
  // clientID and clientSecret are given names from Slack API
  // slackClientId is the name we gave to our variable in .env
  clientID: process.env.slackClientId,
  clientSecret: process.env.slackClientSecret,
  callbackURL: '/slack/callback',
  proxy: true // not important now, but yes when in production
}, ( accessToken, refreshToken, userInfo, cb ) => {
  // console.log('who is this: ', userInfo);

  // es6 destructuring
    const { email, name } = userInfo.user;
    // this is the same as saying const email = userInfo.user.email
    // and const name = userInfo.user.name
    User.findOne({ $or: [
      // { email:email }
      { email },
      { slackID: userInfo.user.id }
    ] })
    .then( user => {
      if(user){
        // log the user in if we found the account in our DB
        cb(null, user);
        return;
      }
      User.create({
        // email: email
        email,
        fullName: name,
        slackID: userInfo.user.id
      })
      .then( newUser => {
        cb(null, newUser);
      } )
      .catch( err => next(err) ) // closes User.create()
    } )
    .catch( err => next(err) ) // closes User.findOne()
}))