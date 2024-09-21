const { Router } = require("express");
const partRouter = Router();
const partController = require("../controllers/partController");

// GET requests:
partRouter.get("/", partController.partGet);
partRouter.get("/:part_id", partController.selectedPartGet);
partRouter.get("/edit/:part_id", partController.editPartGet);

// POST requests:
partRouter.post("/new", partController.partNewPost);
partRouter.post("/edit/:part_id", partController.editPartPost);
partRouter.post("/:part_id/delete", partController.deletePart);

module.exports = partRouter;
