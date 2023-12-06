const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const CommonMessage = sequelize.define("CommonMessage", {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = CommonMessage;
