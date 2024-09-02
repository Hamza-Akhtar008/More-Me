'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
    // Remove the isAdmin column
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        unique: true, // Add unique constraint to the email column
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'isAdmin', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
      }),
    ]);
  },
};
