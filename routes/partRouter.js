const { Router } = require("express");
const partRouter = Router();
const partController = require("../controllers/partController");

partRouter.get("/", partController.partGet);

partRouter.post("/new", partController.partNewPost);

partRouter.get("/:part_id/edit", partController.editPart);

partRouter.post("/:part_id/delete", partController.deletePart);


partRouter.get("/:part_id", partController.selectedPartGet);


module.exports = partRouter;
