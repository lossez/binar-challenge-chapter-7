"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user_game, {
        foreignKey: "user_id",
        as: "user_game",
      });
    }
  }
  user_game_biodata.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.STRING,
      umur: DataTypes.INTEGER,
      profile_picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_game_biodata",
      underscored: true,
    }
  );
  return user_game_biodata;
};
