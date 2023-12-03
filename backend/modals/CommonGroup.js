const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const CommonGroup = sequelize.define("CommonGroup", {
  GroupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

module.exports = CommonGroup;
