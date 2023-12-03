const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Group = sequelize.define("Group", {
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Group;
