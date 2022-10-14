const router = require("express").Router();
const isLoggedIn = require("./../middleware/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  // Check if the incoming request has a valid cookie/session
  let userIsLoggedIn = false;
  if (req.session.user) {
    userIsLoggedIn = true;
  }

  res.render("index", { userIsLoggedIn: userIsLoggedIn });
});

// GET /secret
// We use the isLoggedIn middleware to protect the route

router.get("/secret", isLoggedIn, (req, res, next) => {
  res.render("secret-view");
});

module.exports = router;
