'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StartUpQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
        type: Sequelize.STRING, // Storing as comma-separated string for simplicity
        allowNull: true,
      },
      childrenNames: {
        type: Sequelize.STRING, // Storing as comma-separated string for simplicity
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StartUpQuestions');
  },
};
