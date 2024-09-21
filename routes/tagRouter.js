const { Router } = require("express");

const tagRouter = Router();

const tagController = require("../controllers/tagController");


// GET requests:
tagRouter.get("/", tagController.tagGet);
tagRouter.get("/:tag_name", tagController.tag_name);
tagRouter.get("/:tag_name/edit", tagController.tag_name);


// POST requests:
tagRouter.post("/new", tagController.tagNewPost);
tagRouter.post("/:tag_name/edit", tagController.tagNewPost);
tagRouter.post("/:tag_name/delete", tagController.tagNewPost);

module.exports = tagRouter;
