const { saveChat, getChat } = require("../controllers/chat");
const { authorize } = require("../middleware/authorize");
const router = require("express").Router();
router.post("/chat", authorize, saveChat);
router.get("/chat", authorize, getChat);
module.exports = router;
