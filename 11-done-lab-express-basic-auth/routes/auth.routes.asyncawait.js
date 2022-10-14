// routes/auth.routes.js

const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const zxcvbn = require("zxcvbn");

const saltRounds = 10;

// ROUTES:

// GET  /signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

// POST /signup
router.post("/signup", async (req, res) => {
  try {
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

    // // Check the password strength (optional)
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

    const foundUser = await User.findOne({ username: username });
    // Check that the username is not taken

    if (foundUser) {
      throw new Error("The username is taken");
    }

    // Generating the salt string
    const salt = await bcrypt.genSalt(saltRounds);

    // Encrypt the password
    const hashedPassword = bcrypt.hash(password, salt);

    // Create the new user
    return User.create({ username: username, password: hashedPassword });

    // Redirect to the home `/` page after the successful signup
    res.redirect("/");

    //
    //
  } catch (err) {
    res.render("auth/signup-form", {
      errorMessage: err.message || "Error while trying to sign up",
    });
  }
});

// GET /login
router.get("/login", (req, res) => {
  res.render("auth/login-form");
});

// POST /login
router.post("/login", async (req, res) => {
  try {
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

    // Check if the user exists
    const foundUser = User.findOne({ username: username });

    if (!foundUser) {
      throw new Error("Wrong credentials");
    }

    // Compare the passwords
    const isCorrectPassword = bcrypt.compare(password, foundUser.password);

    if (!isCorrectPassword) {
      throw new Error("Wrong credentials");
    } else if (isCorrectPassword) {
      // Create the session + cookie and redirect the user
      // This line triggers the creation of the session in the DB,
      // and setting of the cookie with session id that will be sent with the response
      req.session.user = foundUser;
      res.redirect("/");
    }
  } catch (err) {
    res.render("auth/login-form", {
      errorMessage: err.message || "Provide username and password.",
    });
  }
});

// GET /logout
router.get("/logout", (req, res) => {
  // Delete the session from the sessions collection
  // This automatically invalidates the future request with the same cookie
  req.session.destroy((err) => {
    if (err) {
      // If there is an error while trying to delete the session, render the error page
      return res.render("error");
    }

    res.redirect("/");
  });
});

module.exports = router;
