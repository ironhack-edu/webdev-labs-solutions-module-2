const express = require('express');
const router  = express.Router();
const passport = require("passport");

router.get("/login", (req, res, next) => {
  res.render("auth/login", {'errorMessage': req.flash('error')});
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',passport.authenticate('facebook', {
  successRedirect: '/courses',
  failureRedirect: '/login' })
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
