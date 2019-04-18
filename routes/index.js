const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.User;
const SessionsController = require("../controllers/SessionsController");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ homepage: "hello" });
});

router.post("/login", SessionsController.login);

router.get("/logout", (req, res, next) => {
  req.session = null;
  res.end("logout successful");
});

module.exports = router;
