'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('buyAndSells', 'category', {
      type: Sequelize.STRING,
      allowNull: true, // Modify this if category should not be nullable
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('buyAndSells', 'category');
  },
};
