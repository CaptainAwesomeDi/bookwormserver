"use strict";
const db = require("../models/index");
const sequelize = require("sequelize");
const User = db.User;

const loadCurrentUser = (req, res, next) => {
  console.log(req);
  if (req.session !== null) {
    userId = req.session.userId;
    User.findOne({ where: { id: userId } }).then(user => {
      console.log(user);
      next();
    });
  } else {
    next();
  }
};

module.exports = {
  loadCurrentUser
};
