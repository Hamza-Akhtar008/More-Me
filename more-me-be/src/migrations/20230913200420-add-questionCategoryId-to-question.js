'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Questions', 'questionCategoryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'QuestionCategories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Questions', 'questionCategoryId');
  },
};
