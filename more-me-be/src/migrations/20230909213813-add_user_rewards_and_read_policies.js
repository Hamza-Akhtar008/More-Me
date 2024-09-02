'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'userRewards', {
      type: Sequelize.INTEGER,
      allowNull: true, // You can set this to false if it's required
    });

    await queryInterface.addColumn('Users', 'readPolicies', {
      type: Sequelize.ARRAY(Sequelize.INTEGER), // Assuming you are using PostgreSQL. Modify the type if you are using a different database.
      allowNull: true, // You can set this to false if it's required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'userRewards');
    await queryInterface.removeColumn('Users', 'readPolicies');
  },
};
