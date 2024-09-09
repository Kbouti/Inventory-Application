const { Router } = require("express");

const tagRouter = Router();

const tagController = require("../controllers/tagController");

tagRouter.get("/", tagController.tagGet);

tagRouter.post("/new", tagController.tagNewPost);

module.exports = tagRouter;
