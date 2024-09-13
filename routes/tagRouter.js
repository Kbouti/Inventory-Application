const { Router } = require("express");

const tagRouter = Router();

const tagController = require("../controllers/tagController");

tagRouter.get("/", tagController.tagGet);

tagRouter.get("/:tag_name", tagController.tag_name);


tagRouter.post("/new", tagController.tagNewPost);

module.exports = tagRouter;
