const express = require("express");
const router = express.Router();

const tagsController = require("../controllers/tagsController");
const validator = require("../middleware/validator.js");
const { idValidator } = require("../validations/id.js");
const { bodyData } = require("../validations/tags.js");

router.post("/", validator(bodyData), tagsController.store);

router.get("/", tagsController.index);
router.use("/:id", validator(idValidator));

router.get("/:id", tagsController.show);

router.put("/:id", validator(bodyData), tagsController.update);

router.delete("/:id", tagsController.destroy);

module.exports = router;
