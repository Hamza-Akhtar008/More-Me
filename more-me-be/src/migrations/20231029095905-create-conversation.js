'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user1Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      user2Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.addConstraint('Conversations', {
        type: 'unique',
        fields: ['user1Id', 'user2Id'],
        name: 'unique_user_conversation',
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Conversations', 'unique_user_conversation')
      .then(() => queryInterface.dropTable('Conversations'));
  }
};