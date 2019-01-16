"use strict";
module.exports = (sequelize, DataTypes) => {
  const BookImage = sequelize.define(
    "BookImage",
    {
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      path: DataTypes.STRING
    },
    {}
  );
  BookImage.associate = function(models) {
    // associations can be defined here
    BookImage.belongsTo(models.Book);
    BookImage.belongsTo(models.User);
  };
  return BookImage;
};

//TODO: Data Valiadtion
