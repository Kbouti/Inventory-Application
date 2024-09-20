const { Router } = require("express");
const partRouter = Router();
const partController = require("../controllers/partController");

partRouter.get("/", partController.partGet);

partRouter.post("/new", partController.partNewPost);

// partRouter.get("/:part_id/edit", partController.editPart);
// partRouter.post("/:part_id/edit", partController.editPartPost)
// Our selectedPartGet route is somehow getting triggered accidentally. 
// We're going to refactor our routes to make sure that doesn't happen. 

partRouter.get("/edit/:part_id", partController.editPartGet);
partRouter.post("/edit/:part_id", partController.editPartPost)

// partRouter.post("/:part_id/delete", partController.deletePart);
partRouter.post("/delete/:part_id", partController.deletePart);


partRouter.get("/:part_id", partController.selectedPartGet);


module.exports = partRouter;
