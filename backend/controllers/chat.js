const Chat = require("../modals/chat");
const User = require("../modals/user");

//m-post => /chat
const saveChat = async (req, res, next) => {
  try {
    console.log("savechat controller");
    const { message } = req.body;
    const data = await Chat.create({
      message,
      userId: req.userId,
    });
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ mesage: error.message });
  }
};
// m-get =>/chat
const getChat = async (req, res) => {
  try {
    // Fetch all chat messages along with user details
    const messages = await Chat.findAll({
      attributes: ["message", "createdAt"],
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
module.exports = { saveChat, getChat };
