const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.handleNewUser);
router.post("/login", authController.handleLogin);

module.exports = router;
