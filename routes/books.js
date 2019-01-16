const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});
const upload = multer({ storage: storage });
const db = require("../models/index");
const BookImage = db.BookImage;

router.post("/", upload.single("bookImage"), (req, res, next) => {
  console.log(req.file.url);
  res.send("books home!");
});

module.exports = router;
