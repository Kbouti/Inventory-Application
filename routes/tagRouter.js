const { Router } = require("express");

const tagRouter = Router();

const tagController = require("../controllers/tagController");


const indexController = require("../controllers/indexController");
const staticResources = require("../staticResources");
const queries = require("../database/queries");


let links = staticResources.links;
let title = staticResources.title;

tagRouter.get("/", tagController.tagGet);

tagRouter.post("/new", tagController.tagNewPost);

module.exports = tagRouter;
