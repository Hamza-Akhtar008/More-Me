'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'resetToken', {
      type: Sequelize.STRING,
      defaultValue: null,
    });

    await queryInterface.addColumn('Users', 'resetTokenExpires', {
      type: Sequelize.DATE,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'resetToken');
    await queryInterface.removeColumn('Users', 'resetTokenExpires');
  },
};
