'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Questions', 'image', {
      type: Sequelize.STRING,
      allowNull: true, // Modify this if image should not be nullable
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Questions', 'image');
  },
};
