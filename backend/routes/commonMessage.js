const express = require("express");
const {
  postMessage,
  getMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/commonMessage");
const { authorize } = require("../middleware/authorize");
const router = express.Router();

router.post("/common-message", authorize, postMessage);
router.get("/common-message", authorize, getMessage);
router.delete("/common-message/:messageId", authorize, deleteMessage);
router.put("/common-message", authorize, updateMessage);
module.exports = router;
