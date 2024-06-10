const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validator = require("../middleware/validator.js");

const { registerData, loginData } = require("../validations/users.js");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post(
  "/register",
  [upload.single("uploads"), validator(registerData)],
  authController.register
);

router.post("/login", validator(loginData), authController.login);

module.exports = router;
