const express = require("express");
const { signup, login, getUser } = require("../controllers/user");
const { generateToken } = require("../middleware/generateToken");
const { authorization } = require("../controllers/auth");
const { authorize } = require("../middleware/authorize");
const router = express.Router();
console.log("user router");
router.post("/signup", signup);
router.post("/login", generateToken, login);
router.get("/user", authorize, getUser);
router.get("/authorization", authorization);
module.exports = router;
