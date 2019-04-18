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
const Book = db.Book;
const User = db.User;

// router.post("/", upload.single("bookImage"), (req, res, next) => {
//   console.log(req.file.url);
//   res.send("books home!");
// });

router.post("/", upload.single("bookImage"), (req, res, next) => {
  const bookParams = req.body;
  Book.create({
    name: bookParams.name,
    author: bookParams.author,
    isbn: bookParams.isbn,
    UserId: 1,
    include: [User]
  })
    .then(book => {
      res.json({ book: book });
    })
    .catch(e => {
      res.json({ e: `${e}` });
    });
});

router.get("/:id", (req, res) => {
  Book.findOne({ where: { id: req.params.id } }).then(book => {
    res.json({ book: `${book.dataValues.UserId}` });
  });
});

module.exports = router;
