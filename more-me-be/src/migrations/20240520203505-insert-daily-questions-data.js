'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert data into the DailyQuestions table
    await queryInterface.bulkInsert('DailyQuestions', [
      {
        userId: 1,
        companyId: 1,
        feeling: 'no no',
        anxietyLevel: 3,
        reason: 'Good news at work',
        symptom: 'yes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more data entries as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback the inserted data
    await queryInterface.bulkDelete('DailyQuestions', null, {});
  }
};