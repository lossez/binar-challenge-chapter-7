"use strict";

const bcrypt = require("bcryptjs");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "user_games",
      [
        {
          username: "admin",
          password: bcrypt.hashSync("admin", 10),
          role_id: "1",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: "user1",
          password: bcrypt.hashSync("12345678", 10),
          role_id: "2",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("user_games", null, {});
  },
};
