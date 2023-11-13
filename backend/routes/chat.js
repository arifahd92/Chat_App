const { saveChat } = require("../controllers/chat");
const { authorize } = require("../middleware/authorize");
const router = require("express").Router();
router.post("/chat", authorize, saveChat);
module.exports = router;
