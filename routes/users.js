var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models/index");
const sequelize = require("sequelize");
const User = db.User;
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send(JSON.stringify({ hello: "world" }));
});

router.post("/register", (req, res, next) => {
  const userInfo = req.body;
  if (userInfo.password !== userInfo.passwordConfirmation) {
    res.json({
      errorMessage: "Please make sure password and password confirmation match!"
    });
  } else {
    bcrypt.hash(userInfo.password, 10).then(hash => {
      User.create({
        email: userInfo.email,
        password: hash,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        nickname: userInfo.nickname
      })
        .then(user => {
          res.json({ success: 1 });
        })
        .catch(e => {
          res.json({ error: `error saving user ${e}` });
        });
    });
  }
});

module.exports = router;
