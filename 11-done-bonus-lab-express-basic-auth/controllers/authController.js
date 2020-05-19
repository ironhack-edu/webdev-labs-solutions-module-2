const authController = require("express").Router();

// User model
const User           = require("../models/User");

// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

authController.get("/signup", (req, res) => {
  res.render("auth/signup");
});

authController.post("/signup", (req, res) => {
  const username = req.body.username;
  const userPassword = req.body.password;

  if (username === "" || userPassword === "") {
    res.render("auth/signup", { errorMessage: "Please provide both, username and password." });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { errorMessage: "The username already exists, please pick another one." });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const password = bcrypt.hashSync(userPassword, salt);

    User
      .create({username, password})
      .then(() => res.redirect("/login"))
      .catch(err => console.log(err));
  });
});

authController.get("/login", (req, res) => res.render("auth/login"));

authController.post("/login", (req, res) => {
  const username = req.body.username;
  const userPassword = req.body.password;

  if (username === "" || userPassword === "") {
    res.render("auth/login", { errorMessage: "Provide both, username and password to login." });
    return;
  }

  User.findOne({ username }, "_id username password", (err, user) => {
    if (err || !user) {
      res.render("auth/login", { errorMessage: "The username doesn't exist." });
    } else {
      if (bcrypt.compareSync(userPassword, user.password)) {
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    }
  });
});

authController.get("/logout", (req, res, next) => {
  if (!req.session.currentUser) { 
    res.redirect("/login"); 
    return; 
  }

  req.session.destroy( err => {
    if (err) { 
      console.log(err); 
    } else { 
      res.redirect("/login"); 
    }
  });
});

module.exports = authController;
