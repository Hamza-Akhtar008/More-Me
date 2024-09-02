'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    conversationId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    messageText: DataTypes.TEXT
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User, { foreignKey: "senderId" });
    Message.belongsTo(models.Conversation, { foreignKey: "conversationId" });
  };
  return Message;
};