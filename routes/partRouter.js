const { Router } = require("express");

const partRouter = Router();
const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;



partRouter.get("/", async (req, res) => {
    res.render("../views/parts", {
        links,
        title,
        subTitle: "Parts",
      });
});

module.exports = partRouter;