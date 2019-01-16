"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: sequelize.STRING,
        validate: {
          isEmail: true,
          notNull: true,
          isUnique(value) {
            const existingEmail = User.findOne({ where: { email: value } });
            if (existingEmail) {
              throw new Error("This Email address have been used");
            }
          }
        }
      },
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      nickname: {
        type: sequelize.STRING,
        validate: {
          len: [2, 10]
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
