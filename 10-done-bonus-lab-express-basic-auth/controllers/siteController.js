const siteController = require("express").Router();

siteController.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

siteController.get("/", (req, res) => res.render("site/index"));

module.exports = siteController;
