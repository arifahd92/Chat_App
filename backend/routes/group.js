const express = require("express");
const router = express.Router();
console.log("grouprouter called");
const {
  createGroup,
  deleteGroup,
  memberGroups,
  getAdminGroups,
} = require("../controllers/group");
const { authorize } = require("../middleware/authorize");
router.get("/member-groups", authorize, memberGroups);
router.get("/admin-groups", authorize, getAdminGroups);
router.post("/create-group", authorize, createGroup);
router.delete("/delete-group", authorize, deleteGroup);
module.exports = router;
