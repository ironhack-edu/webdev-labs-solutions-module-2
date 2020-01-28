const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require('../models/user');
const Course = require("../models/course");

router.get("/", (req, res, next) => {
  res.render("home");
});

module.exports = router;
