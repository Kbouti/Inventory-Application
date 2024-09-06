const { Router } = require("express");

const tagRouter = Router();
const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;


tagRouter.get("/", async (req, res) => {
    res.render("../views/index", {
        links,
        title,
        subTitle: "Tags",
      });
});

module.exports = tagRouter;