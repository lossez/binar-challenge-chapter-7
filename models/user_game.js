"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    static associate(models) {
      this.hasOne(models.user_game_biodata, {
        foreignKey: "user_id",
        as: "user_game_biodata",
      });
      this.hasMany(models.user_game_history, {
        foreignKey: "user_id",
        as: "user_game_history",
      });
      this.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "user_roles",
      });
    }

    validPassword = (password) => {
      return bcrypt.compareSync(password, this.password);
    };

    static generateHash = (password) => {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };

    generateToken = () => {
      const { id, username } = this;
      return jwt.sign({ id, username }, process.env.JWT_SECRET);
    };

    static authenticate = async (username, password) => {
      try {
        const user = await this.findOne({
          where: {
            username,
          },
        });
        if (!user) {
          throw new Error("Username is not registered");
        }
        if (!user.validPassword(password)) {
          throw new Error("Password is incorrect");
        }
        return user;
      } catch (err) {
        throw new Error(err.message);
      }
    };
  }
  user_game.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_game",
      underscored: true,
    }
  );
  return user_game;
};
