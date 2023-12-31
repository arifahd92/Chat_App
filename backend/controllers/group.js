// controllers/groupController.js

const sequelize = require("../db/connection");
const User = require("../modals/User");
const UserGroup = require("../modals/UserGroup");
const Group = require("../modals/group");

async function createGroup(req, res) {
  console.log(
    "create group controller called ******************************" +
      " " +
      req.userId
  );
  try {
    const adminId = req.userId;
    const { groupName, memberIds, description } = req.body;

    // Check if the admin exists
    const admin = await User.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Unauthorized access" });
    }

    // Use a transaction to ensure data consistency
    await sequelize.transaction(async (t) => {
      // Create the group with the admin as the creator
      const group = await Group.create(
        {
          groupName,
          description,
          adminId: req.userId,
        },
        { transaction: t }
      );

      // Add members to the group
      await group.addUsers(memberIds, { transaction: t });
    });

    return res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
//delete group

async function deleteGroup(req, res) {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if the requester is the admin of the group
    const requesterId = req.userId; //
    if (group.adminId !== requesterId) {
      return res.status(403).json({ error: "Permission denied" });
    }

    // Delete the group
    await group.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// find groups

async function getAdminGroups(req, res) {
  try {
    const userId = req.userId;

    // Check if the user exists
    const user = await User.findByPk(userId);

    if (!user) {
      console.log(
        "User not found unouthorize access group controller get admin groups ***********************************8"
      );
      return res
        .status(404)
        .json({ error: "User not found unouthorize access" });
    }

    // Find all groups where the user is the admin
    const adminGroups = await Group.findAll({
      where: { adminId: user.id },
    });

    return res.status(200).json(adminGroups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
//************************ */
//gett All group in which a user is member

const memberGroups = async (req, res) => {
  const userId = req.userId;

  try {
    // Find user by ID and include associated groups
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Group,
          through: UserGroup,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("user with its member wala group");
    // console.log(user);
    // Extract groups from the user object
    const groups = user.Groups;

    return res.json(groups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createGroup,
  deleteGroup,
  memberGroups,
  getAdminGroups,
};
