"use strict";
const db = require("../models/index");
const User = db.User;
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      isbn: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      rating: DataTypes.STRING
    },
    {}
  );
  Book.associate = function(models) {
    // associations can be defined here
    Book.belongsTo(models.User);
    Book.hasMany(models.BookImage);
    Book.hasMany(models.Comment);
  };
  return Book;
};

//TODO: Data Valiadtion
