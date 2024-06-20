const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validator = require("../middleware/validator.js");

const { registerData, loginData } = require("../validations/users.js");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cf) => {
    const fileType = path.extname(file.originalname);
    cf(null, String(Date.now()) + fileType);
  },
});

const upload = multer({ storage });

router.get("/", authController.index);

router.post(
  "/register",
  [upload.single("profileImage"), validator(registerData)],
  authController.register
);

router.post("/login", validator(loginData), authController.login);

module.exports = router;
