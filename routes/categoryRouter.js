const { Router } = require("express");

const categoryRouter = Router();

const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;



categoryRouter.get("/", async (req, res) => {
    res.render("../views/index", {
        links,
        title,
        subTitle: "Categories",
      });
});

module.exports = categoryRouter;