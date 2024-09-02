'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('QuestionCategories', [
      // {
      //   id: 1,
      //   name: 'Motivation',
      //   img: 'category1.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 2,
      //   name: 'Exercise',
      //   img: 'category2.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 3,
      //   name: 'Leadership',
      //   img: 'category2.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 4,
      //   name: 'Nutrition',
      //   img: 'category2.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 5,
      //   name: 'Self Care',
      //   img: 'category2.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 6,
      //   name: 'MindSet',
      //   img: 'category2.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 7,
      //   name: 'Personal Finance',
      //   img: 'category2.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    // Remove all rows from the table when rolling back the seed
    return queryInterface.bulkDelete('QuestionCategories', null, {});
  },
};
