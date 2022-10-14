// routes/auth.routes.js

const router = require("express").Router();
const User = require("./../models/User.model");
const bcrypt = require("bcryptjs");
const zxcvbn = require("zxcvbn");

const isLoggedIn = require("./../middleware/isLoggedIn");

const saltRounds = 10;

// ROUTES:

// GET  /signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

// POST /signup
router.post("/signup", (req, res) => {
  // Get the username and password from the req.body
  const { username, password } = req.body;

  // Check if the username and the password are provided
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("auth/signup-form", {
      errorMessage: "Provide username and password.",
    });

    return;
  }

  // Check the password strength (optional)
  // const passwordCheck = zxcvbn(password);
  // console.log("passwordCheck", passwordCheck);

  // if (passwordCheck.score < 3) {
  //   res.render("auth/signup-form", {
  //     errorMessage: "Password too weak, try again.",
  //   });

  //   return;
  // }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    res.status(400).render("auth/signup-form", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });

    return;
  }

  // Check that the username is not taken
  User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        throw new Error("The username is taken");
      }

      // Generating the salt string
      return bcrypt.genSalt(saltRounds);
    })
    .then((salt) => {
      // Encrypt the password
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      // Create the new user
      return User.create({ username: username, password: hashedPassword });
      // return User.create({ username, password: hashedPassword });
    })
    .then((createdUser) => {
      // Redirect to the home `/` page after the successful signup
      req.session.user = createdUser;
      res.redirect("/");
    })
    .catch((err) => {
      res.render("auth/signup-form", {
        errorMessage: err.message || "Error while trying to sign up",
      });
    });
});

// GET /login
router.get("/login", (req, res) => {
  res.render("auth/login-form");
});

// POST /login
router.post("/login", (req, res) => {
  // Get the username and password from the req.body
  const { username, password } = req.body;

  // Check if the username and the password are provided
  const usernameNotProvided = !username || username === "";
  const passwordNotProvided = !password || password === "";

  if (usernameNotProvided || passwordNotProvided) {
    res.render("auth/login-form", {
      errorMessage: "Provide username and password.",
    });

    return;
  }

  let user;
  // Check if the user exists
  User.findOne({ username: username })
    .then((foundUser) => {
      user = foundUser;

      if (!foundUser) {
        throw new Error("Wrong credentials");
      }

      // Compare the passwords
      return bcrypt.compare(password, foundUser.password);
    })
    .then((isCorrectPassword) => {
      if (!isCorrectPassword) {
        throw new Error("Wrong credentials");
      } else if (isCorrectPassword) {
        // Create the session + cookie and redirect the user
        // This line triggers the creation of the session in the DB,
        // and setting of the cookie with session id that will be sent with the response
        req.session.user = user;
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.render("auth/login-form", {
        errorMessage: err.message || "Provide username and password.",
      });
    });
});

// GET /logout
router.get("/logout", isLoggedIn, (req, res) => {
  // Delete the session from the sessions collection
  // This automatically invalidates the future request with the same cookie
  req.session.destroy((err) => {
    if (err) {
      return res.render("error");
    }

    // If session was deleted successfully redirect to the home page.
    res.redirect("/");
  });
});

module.exports = router;
