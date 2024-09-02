'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StartUpQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      ageRange: {
        type: Sequelize.STRING,
        allowNull: true
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bookTitle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      childrenDOBs: {
        type: Sequelize.STRING, // Storing as comma-separated string
        allowNull: true
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      engagementMethod: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      hasChildren: {
        type: Sequelize.STRING, // Storing as string ("yes" or "no")
        allowNull: true
      },
      hobby: {
        type: Sequelize.STRING,
        allowNull: true
      },
      interestTopic: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lifePrincipleInspiration: {
        type: Sequelize.STRING,
        allowNull: true
      },
      numChildren: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      personalityType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      readingPreference: {
        type: Sequelize.STRING,
        allowNull: true
      },
      relationshipStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      relaxationActivity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      spouseDOB: {
        type: Sequelize.DATE,
        allowNull: true
      },
      spouseName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StartUpQuestions');
  }
};
