const express = require("express");
const router = express.Router();
const SessionsController = require("../controllers/SessionsController");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ homepage: "hello" });
});

router.post("/login", SessionsController.login);
router.get("/logout", SessionsController.logout);

module.exports = router;
