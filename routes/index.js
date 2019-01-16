const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.users;
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } }).then(async user => {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.userId = user.id;
      res.send(JSON.stringify({ success: 1, user: user }));
    } else {
      res.send("login failed");
    }
  });
});

router.get("/logout", (req, res, next) => {
  req.session = null;
  res.end("logout successful");
});

module.exports = router;
