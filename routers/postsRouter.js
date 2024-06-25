const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postController");
const validator = require("../middleware/validator.js");
const { slugValidator } = require("../validations/slug.js");
const { bodyData } = require("../validations/posts.js");
const auth = require("../middleware/auth.js");
const authorizePost = require("../middleware/authorizePost.js");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/image",
  filename: (req, file, cf) => {
    const fileType = path.extname(file.originalname);
    cf(null, String(Date.now()) + fileType);
  },
});

const upload = multer({ storage });

router.get("/", postsController.index);

router.use(auth);

router.use("/:slug", validator(slugValidator));

router.get("/:slug", postsController.show);

router.use(authorizePost);

router.post(
  "/",
  [upload.single("postImage"), validator(bodyData)],
  postsController.store
);

router.put("/:slug", validator(bodyData), postsController.update);

router.delete("/:slug", postsController.destroy);

module.exports = router;
