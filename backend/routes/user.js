const express = require("express");
const { signup, login } = require("../controllers/user");
const { generateToken } = require("../middleware/generateToken");
const router = express.Router();
console.log("user router");
router.post("/signup", signup);
router.post("/login", generateToken, login);
module.exports = router;
