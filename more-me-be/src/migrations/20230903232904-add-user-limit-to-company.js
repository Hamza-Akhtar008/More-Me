'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Companies', 'userLimit', {
      type: Sequelize.INTEGER,
      allowNull: true, // Modify this based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Companies', 'userLimit');
  },
};
