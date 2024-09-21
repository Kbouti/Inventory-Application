const { Router } = require("express");

const tagRouter = Router();

const tagController = require("../controllers/tagController");


// GET requests:
tagRouter.get("/", tagController.tagGet);
tagRouter.get("/:tag_id", tagController.specificTagGet);
tagRouter.get("/:tag_id/edit", tagController.tagEditGet);


// POST requests:
tagRouter.post("/new", tagController.tagNewPost);
// tagRouter.post("/:tag_id/edit", tagController.aaaa);
// tagRouter.post("/:tag_id/delete", tagController.aaaaa);

module.exports = tagRouter;
