"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
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
  user_game_history.init(
    {
      score: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user_game_history",
      underscored: true,
    }
  );
  return user_game_history;
};
