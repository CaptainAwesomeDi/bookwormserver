"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        lowercase: true,
        validate: {
          isEmail: true,
          is_Unique(value, next) {
            console.log(next);
            User.findOne({ where: { email: value } }).done(user => {
              if (user) {
                return next("Email address is already in use");
              }
              next();
            });
          }
        }
      },
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      nickname: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 24]
        }
      }
    },
    {}
  );

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Book);
    User.hasMany(models.BookImage);
    User.hasMany(models.Comment);
  };
  return User;
};

//TODO: add model validations
//TODO: Generate email configureration code
