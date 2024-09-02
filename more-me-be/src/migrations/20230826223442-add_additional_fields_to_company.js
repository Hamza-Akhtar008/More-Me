'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Companies', 'ntn', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Companies', 'postalAddress', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Companies', 'city', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Companies', 'country', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Companies', 'companyEmail', {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Companies', 'ntn');
    await queryInterface.removeColumn('Companies', 'postalAddress');
    await queryInterface.removeColumn('Companies', 'city');
    await queryInterface.removeColumn('Companies', 'country');
    await queryInterface.removeColumn('Companies', 'companyEmail');
  },
};
