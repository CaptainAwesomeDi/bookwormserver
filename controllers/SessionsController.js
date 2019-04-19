const db = require("../models/index");
const User = db.User;
const bcrypt = require("bcrypt");

module.exports = {
  login: (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ where: { email } }).then(async user => {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.userId = user.id;
        res.json({ success: 1, user: user });
      } else {
        res.json({ message: "login failed" });
      }
    });
  },
  logout: (req, res, next) => {
    req.session = null;
    res.json({ message: "logout successful" });
  }
};
