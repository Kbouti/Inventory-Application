const { Router } = require("express");

const categoryRouter = Router();

const categoryController = require("../controllers/categoryController");



categoryRouter.get("/", categoryController.categoryGet);

categoryRouter.get("/:category_name", categoryController.category_nameGet);

categoryRouter.post("/new", categoryController.categoryNewPost);

module.exports = categoryRouter;
