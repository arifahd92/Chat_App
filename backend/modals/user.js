const sequelize = require("../db/connection");
const Sequelize = require("sequelize");
const Group = require("./group");
const UserGroup = require("./UserGroup");

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Ensure the email is unique
    validate: {
      isEmail: {
        msg: "Please enter a valid email address",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 255], // Minimum and maximum length for the password
        msg: "Password must be between 8 and 255 characters",
      },
    },
  },
});
User.belongsToMany(Group, { through: UserGroup, foreignKey: "userId" });
module.exports = User;
