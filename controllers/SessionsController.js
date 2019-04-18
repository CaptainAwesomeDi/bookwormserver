const db = require("../models/index");
const User = db.User;
const bcrypt = require("bcrypt");

module.exports = {
  login: function(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } }).then(async user => {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.userId = user.id;
        res.send(JSON.stringify({ success: 1, user: user }));
      } else {
        res.send("login failed");
      }
    });
  }
};
