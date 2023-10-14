const express = require("express");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.register);

module.exports = router;
