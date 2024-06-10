const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postController");
const validator = require("../middleware/validator.js");
const { slugValidator } = require("../validations/slug.js");
const { bodyData } = require("../validations/posts.js");
const auth = require("../middleware/auth.js");
const authorizePost = require("../middleware/authorizePost.js");

router.use(auth);

router.post("/", validator(bodyData), postsController.store);

router.get("/", postsController.index);

router.use("/:slug", validator(slugValidator));

router.get("/:slug", postsController.show);

router.use(authorizePost);

router.put("/:slug", validator(bodyData), postsController.update);

router.delete("/:slug", postsController.destroy);

module.exports = router;
