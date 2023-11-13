const Chat = require("../modals/chat");

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
module.exports = { saveChat };
