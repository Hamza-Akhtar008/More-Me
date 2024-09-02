"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "teamId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Teams",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "teamId");
  },
};
