const { Router } = require("express");

const partRouter = Router();
const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;
let categories = staticResources.categories;
let tags = staticResources.tags;



partRouter.get("/", async (req, res) => {

// The form to create a new part needs the current list of categories for the drop down. 
// Instead, importing a static array for development


    res.render("../views/parts", {
        links,
        title,
        categories,
        tags,
        subTitle: "Parts",
      });
});

module.exports = partRouter;