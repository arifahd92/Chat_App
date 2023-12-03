const CommonMessage = require("../modals/CommonMessage");
const User = require("../modals/User");

//m-post=>common-message
const postMessage = async (req, res) => {
  console.log("common message controller post message", req.userId);
  try {
    const { message } = req.body;
    console.log({ commonMessage: message, id: req.userId });

    const data = await CommonMessage.create({
      commonMessage: message,
      userId: req.userId,
    });
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//m-get=>common-message
const getMessage = async (req, res) => {
  console.log("common message controller post message", req.userId);
  try {
    // Fetch all common messages along with user details
    const messages = await CommonMessage.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    res.json(messages);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//m-delete=>common-message
const deleteMessage = async (req, res) => {
  console.log("common message controller=> delete message", req.userId);
  try {
    // Find the message by ID
    const messageId = req.params.messageId;
    const message = await CommonMessage.findByPk(messageId);

    if (!message) {
      // If the message is not found, send a 404 Not Found response
      return res.status(404).json({ error: "Message not found" });
    }

    // Check if the user making the request is the owner of the message (you might want to add additional authorization logic)
    if (message.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this message" });
    }

    // Delete the message
    await message.destroy();
    // Send a success response
    return res.status(204).send(); // 204 No Content indicates successful deletion
  } catch (error) {
    console.error("Error deleting message:", error);
    // Handle other errors (e.g., database error) and send a 500 Internal Server Error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
//m-put=>common-message
const updateMessage = async (req, res) => {
  const messageId = req.params.messageId; // Assuming the message ID is in the request parameters
  const { commonMessage } = req.body; // Assuming the updated content is provided in the request body

  try {
    // Find the message by ID
    const message = await CommonMessage.findByPk(messageId);

    if (!message) {
      // If the message is not found, send a 404 Not Found response
      return res.status(404).json({ error: "Message not found" });
    }

    // Check if the user making the request is the owner of the message (you might want to add additional authorization logic)
    if (message.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this message" });
    }

    // Update the message content
    //message is an instance
    message.commonMessage = commonMessage; // Update other fields as needed

    // Save the updated message to the database
    await message.save();

    // Send the updated message as a response
    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error updating message:", error);
    // Handle other errors (e.g., database error) and send a 500 Internal Server Error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { postMessage, getMessage, deleteMessage, updateMessage };
