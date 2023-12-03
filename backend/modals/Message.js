const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

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

module.exports = Message;
