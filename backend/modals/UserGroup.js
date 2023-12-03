const sequelize = require("../db/connection");

const UserGroup = sequelize.define("UserGroup", {
  // No need to include UserGroupID since Sequelize automatically adds it as the primary key
});

module.exports = UserGroup;
