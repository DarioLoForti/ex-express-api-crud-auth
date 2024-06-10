const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validator = require("../middleware/validator.js");

const { registerData, loginBody } = require("../validations/auth.js");

router.post("/register", validator(registerData), authController.register);

router.post("/login", validator(loginBody), authController.login);

module.exports = router;
