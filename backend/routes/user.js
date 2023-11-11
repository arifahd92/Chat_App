const express = require("express");
const { signup } = require("../controllers/user");
const router = express.Router();
console.log("user router");
router.post("/register", signup);
module.exports = router;
