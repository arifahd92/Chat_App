const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const User = require("./User");
const Group = require("./group");

const Message = sequelize.define("Message", {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isGroupMessage: {
    type: DataTypes.BOOLEAN,

    defaultValue: false,
  },
});
Message.belongsTo(User, { as: "Sender", foreignKey: "SenderId" });
Message.belongsTo(User, { as: "Recipient", foreignKey: "RecipientId" });
Message.belongsTo(Group, { as: "Group", foreignKey: "GroupId" });
module.exports = Message;
