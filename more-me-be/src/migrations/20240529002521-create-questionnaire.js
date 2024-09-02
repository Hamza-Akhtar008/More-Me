'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questionnaires', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      questionnaireTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      questionnaireDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reAttempted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      isReady: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    }, {
      paranoid: true,
      timestamps: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questionnaires');
  }
};