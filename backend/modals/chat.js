const sequelize = require("../db/connection");
const Sequelize = require("sequelize");
const Chat = sequelize.define("chat", {
  message: {
    type: Sequelize.STRING,
  },
});
module.exports = Chat;
