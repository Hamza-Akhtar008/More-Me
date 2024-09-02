'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    user1Id: DataTypes.INTEGER,
    user2Id: DataTypes.INTEGER
  }, {});
  Conversation.associate = function(models) {
    Conversation.belongsTo(models.User, { foreignKey: "user1Id", as: "User1" });
    Conversation.belongsTo(models.User, { foreignKey: "user2Id", as: "User2"  });
    Conversation.hasMany(models.Message, {
      foreignKey: 'conversationId',
    });
  };
  return Conversation;
};