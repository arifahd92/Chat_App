const router = require("express").Router();

const { authorize } = require("../middleware/authorize");

const {
  createGroupMessage,
  getGroupMessages,
  deleteMessage,
  createOneOneMessage,
  getOneOneMessages,
} = require("../controllers/message");

//route for single  message (one to one chat)

router.post("/user/message/:recipientId", createOneOneMessage); //to save chat i want recipientId and senderid, senderId will be taken from authorization
router.get("/user/message/:recipientId", getOneOneMessages);

//route for group  message

router.post("/group/message/:groupId", authorize, createGroupMessage);
router.get("/group/message/:groupId", authorize, getGroupMessages);

//deleteMessage
router.delete("/group/message/:messageId", authorize, deleteMessage);

module.exports = router;
