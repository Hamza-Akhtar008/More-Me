"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "companyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Companies", // This should be the name of your Company model
        key: "id", // This should be the name of the primary key in the Company model
      },

      onUpdate: "CASCADE",
      onDelete: "SET NULL", // or 'CASCADE' or 'SET DEFAULT' depending on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "companyId");
  },
};
