const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");
const validator = require("../middleware/validator.js");
const { idValidator } = require("../validations/id.js");
const { bodyData } = require("../validations/categories.js");

router.post("/", validator(bodyData), categoriesController.store);

router.get("/", categoriesController.index);

router.use("/:id", validator(idValidator));

router.get("/:id", categoriesController.show);

router.put("/:id", validator(bodyData), categoriesController.update);

router.delete("/:id", categoriesController.destroy);

module.exports = router;
