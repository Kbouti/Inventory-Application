const { Router } = require("express");

const indexRouter = Router();

const indexController = require("../controllers/indexController");
const categoryRouter = require("./categoryRouter");

const staticResources = require("../staticResources");
// Now importing these from a dedicated file
let links = staticResources.links;
let title = staticResources.title;

// Now pulling categories from index controller => which gets from a db query
// let categories = staticResources.categories;



indexRouter.get("/", indexController.indexGet);

module.exports = indexRouter;

// *****************************************************************





// indexRouter.get("/", async (req, res) => {
//     const categories = await indexController.getCategories();
//     const tags = await indexController.getTags();
//       console.log("Fetched categories and tags");
//     // console.log(`categories: ${categories}`);
//     // categories.forEach((category) => console.log(category.name));


//   res.render("../views/index", {
//     links,
//     title,
//     categories,
//     tags,
//     subTitle: "Home",
//   });
// });

// *****************************************************************
// Not sure if we'll need this part
// indexRouter.get("/:category", async (req, res) => {
//   // Here we will eventually render all the parts in this category, as well as any forms to alter this category
//   res.render("../views/index/category", {
//     title,
//     subTitle: "Create a Category",
//   });
// });

