"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      message: {
        type: sequelize.STRING,
        validate: {
          notEmpty: true
        }
      }
    },
    {}
  );
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Book);
    Comment.belongsTo(models.User);
  };
  return Comment;
};
