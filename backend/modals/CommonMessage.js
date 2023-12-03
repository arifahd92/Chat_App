const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const CommonMessage = sequelize.define("CommonMessage", {
  commonMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = CommonMessage;
