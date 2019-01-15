var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/").User;
const sequelize = require("sequelize");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send(JSON.stringify({ hello: "world" }));
});

router.post("/register", (req, res, next) => {
  const userInfo = req.body;
  if (userInfo.password !== userInfo.passwordConfirmation) {
    res.send(
      JSON.stringify({
        errorMessage:
          "Please make sure password and password confirmation match!"
      })
    );
  } else {
    bcrypt.hash(userInfo.password, 10, (err, hash) => {
      User.build({
        email: userInfo.email,
        password: hash,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        nickname: userInfo.nickname
      })
        .save()
        .catch(e => {
          res.send("error occurred saving user: ${e}");
        });
    });
    res.send(JSON.stringify({ success: 1 }));
  }
});

module.exports = router;
