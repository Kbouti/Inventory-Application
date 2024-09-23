const { Router } = require("express");

const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");


// GET requests:
categoryRouter.get("/", categoryController.categoryGet);
categoryRouter.get("/:category_id", categoryController.category_nameGet);
categoryRouter.get("/:category_id/edit", categoryController.categoryEditGet);


// POST requests:
categoryRouter.post("/new", categoryController.categoryNewPost);
categoryRouter.post("/:category_id/edit", categoryController.categoryEditPost);
categoryRouter.post("/:category_id/delete", categoryController.categoryDeletePost);

module.exports = categoryRouter;
