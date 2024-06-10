const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validator = require("../middleware/validator.js");

const { registerData, loginData } = require("../validations/users.js");

router.post("/register", validator(registerData), authController.register);

router.post("/login", validator(loginData), authController.login);

module.exports = router;
