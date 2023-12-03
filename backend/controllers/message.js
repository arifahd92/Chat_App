const User = require("../modals/User");
const Group = require("../modals/group");
const Message = require("../modals/message");
//controller to get create delete messages in group ()
//m-post=>/group/message/:groupId
async function createGroupMessage(req, res) {
  try {
    const senderId = req.userId;
    const recipientId = null; //as it is a group message so assign null as recipientId id
    const { text } = req.body;
    const { groupId } = req.params;
    if (!groupId) {
      return res.status(404).json({ error: "Group  not found" });
    }
    // Check if the sender is a member of the group (if applicable)
    // Check if sender   exist
    const sender = await User.findByPk(senderId);
    const isMember = await sender.hasGroup(groupId);
    const groupInstance = await Group.findByPk(groupId);
    if (!groupInstance) {
      return res.status(404).json({ error: "no group exist with this id" });
    }
    const adminId = groupInstance.adminId;

    if (!sender) {
      return res.status(404).json({ error: "Sender  not found" });
    }
    if (adminId === req.userId || isMember) {
      // Create the message
      const message = await Message.create({
        text,
        SenderId: senderId,
        RecipientId: recipientId,
        GroupId: groupId,
      });

      return res.status(201).json(message);
    } else if (!adminId || !isMember) {
      return res
        .status(404)
        .json({ error: "Neither you are a member nor admin of this group" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

//m-get =>group/message/:groupId
async function getGroupMessages(req, res) {
  try {
    const senderId = req.userId;
    const recipientId = null;
    const { groupId } = req.params;

    // Check if sender and recipient exist
    const sender = await User.findByPk(senderId);
    const recipient = await User.findByPk(recipientId);

    if (!sender) {
      return res.status(404).json({ error: "unauthorize access" });
    }

    // Check if the sender is a member of the group (if applicable)

    const isMember = await sender.hasGroup(groupId);
    if (!isMember) {
      return res
        .status(403)
        .json({ error: "Sender is not a member of the group" });
    }

    // Retrieve messages
    const messages = await Message.findAll({
      where: {
        GroupId: groupId,
      },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// controllers/messageController.js
// m->delete=>group/message/:messageId
async function deleteMessage(req, res) {
  try {
    const { messageId } = req.params;
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Check if the requester is the sender or recipient of the message
    const requesterId = req.userId; // Assuming you have user authentication middleware
    if (message.SenderId !== req.userId) {
      return res.status(403).json({ error: "Permission denied" });
    }

    await message.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
//controller of one and one messages*********************************************************************
//m-post=>/user/message/:recipientId
const createOneOneMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const { recipientId } = req.params;
    const { text } = req.body;
    const groupId = null; //store null as groupId to identify oneOneMessage
    if (!recipientId) {
      return res.status(404).json({ error: "Receipent  not found" });
    }
    // you can check does a user exists with  receipentId
    const recipient = await User.findByPk(recipientId);
    // Check if sender   exist
    const sender = await User.findByPk(senderId);

    if (!sender) {
      return res.status(404).json({ error: "Sender  not found" });
    }

    if (!recipient) {
      return res.status(404).json({ error: "Recipient  not found" });
    }

    // Create the message
    const message = await Message.create({
      text,
      SenderId: senderId,
      RecipientId: recipientId,
      GroupId: null,
    });

    return res.status(201).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
//get onene message
//m-get=>/user/message/:receiverId
const getOneOneMessages = async (req, res) => {
  try {
    const senderId = req.userId;
    const groupId = null;
    const { recipientId } = req.params;

    // Check if sender and recipient exist
    const sender = await User.findByPk(senderId);
    const recipient = await User.findByPk(recipientId);

    if (!sender) {
      return res.status(404).json({ error: "unauthorize access" });
    }
    if (!recipient) {
      return res.status(404).json({ error: "receipent not found " });
    }

    // Retrieve messages
    const messages = await Message.findAll({
      where: {
        $or: [
          { SenderId: sender.id, RecipientId: recipient.id },
          { SenderId: recipient.id, RecipientId: sender.id },
        ],
        GroupId: groupId,
      },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
/*
     // Retrieve messages
    const messages = await Message.findAll({
      where: {
        $or: [
          { SenderId: sender.id, RecipientId: recipient.id },
          { SenderId: recipient.id, RecipientId: sender.id },
        ],
        GroupId: groupId,
      },
      order: [['createdAt', 'ASC']],
    });
 */
module.exports = {
  createGroupMessage,
  getGroupMessages,
  deleteMessage,
  createOneOneMessage,
  getOneOneMessages,
};