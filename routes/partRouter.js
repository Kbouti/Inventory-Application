const { Router } = require("express");

const partRouter = Router();
const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;
let categories = staticResources.categories;
let tags = staticResources.tags;



partRouter.get("/", async (req, res) => {
// The form to create a new part needs the current list of categories and tags for the drop down. 
// Instead, importing static arrays for development

    res.render("../views/parts", {
        links,
        title,
        categories,
        tags,
        subTitle: "Parts",
      });
});

partRouter.post("/new", async (req, res) => {
  const partName = req.body.part;
  const category = req.body.category;
  const tags = req.body.tag;

  // ******************************************************************************************************
  // Ok! Here is where we need middleware functions to handle the user's input.
  // Need to validate and sanitize input
  // ******************************************************************************************************

  console.log(`You've submitted the following part name: ${partName}, category: ${category}, with the following tags: ${tags}`);
  res.redirect("/");
});

module.exports = partRouter;