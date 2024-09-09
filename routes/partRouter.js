const { Router } = require("express");
const partRouter = Router();
const partController = require("../controllers/partController");

partRouter.get("/", partController.partGet);

partRouter.post("/new", partController.partNewPost);

module.exports = partRouter;
