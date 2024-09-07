const { Router } = require("express");

const indexRouter = Router();

const indexController = require("../controllers/indexController");
const categoryRouter = require("./categoryRouter");

const staticResources = require("../staticResources");
// Now importing these from a dedicated file
let links = staticResources.links;
let title = staticResources.title;
let categories = staticResources.categories;
let tags = staticResources.tags;



indexRouter.get("/", async (req, res) => {

    indexController.getCategories();
// This failed because categories isn't yet a table in our database....
// Next step:
// Run node populatedb to create the table


  // Here we would likely first want to access our database to get our inventory data, then we'd pass it to the view to render it.
  res.render("../views/index", {
    links,
    title,
    categories,
    tags,
    subTitle: "Home",
  });
});


// *****************************************************************
// Not sure about this part
indexRouter.get("/:category", async (req, res) => {
  // Here we will eventually render all the parts in this category, as well as any forms to alter this category
  res.render("../views/index/category", {
    title,
    subTitle: "Create a Category",
  });
});

module.exports = indexRouter;
