'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StartUpQuestions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Assuming you have a Users table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies', // Assuming you have a Companies table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ageRange: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      childrenDOBs: {
        type: Sequelize.STRING, // Storing as comma-separated string
        allowNull: true,
      },
      childrenNames: {
        type: Sequelize.STRING, // Storing as comma-separated string
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      engagementMethod: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hasChildren: {
        type: Sequelize.STRING, // Storing as string ("yes" or "no")
        allowNull: false,
      },
      hobbies: {
        type: Sequelize.STRING, // Storing as comma-separated string
        allowNull: false,
      },
      interestTopics: {
        type: Sequelize.STRING, // Storing as comma-separated string
        allowNull: false,
      },
      lifePrincipleInspirations: {
        type: Sequelize.STRING, // Storing as comma-separated string
        allowNull: false,
      },
      numChildren: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      personalityType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      readingPreference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      relationshipStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      relaxationActivities: {
        type: Sequelize.STRING, // Storing as comma-separated string
        allowNull: false,
      },
      spouseDOB: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      spouseName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contentPreferences: {
        type: Sequelize.STRING, // Storing as comma-separated string
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StartUpQuestions');
  }
};
