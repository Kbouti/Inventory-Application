const { Router } = require("express");

const categoryRouter = Router();
const indexController = require("../controllers/indexController");
const staticResources = require("../staticResources");
const queries = require("../database/queries");

let links = staticResources.links;
let title = staticResources.title;

categoryRouter.get("/", async (req, res) => {
  const categories = await indexController.getCategories();
  const tags = await indexController.getTags();

  res.render("../views/categories", {
    links,
    title,
    categories,
    tags,
    subTitle: "Categories",
  });
});

categoryRouter.post("/new", async (req, res) => {
  const userInput = req.body.category;
  const response = await queries.newCategory(userInput);
  console.log(`Created new category: ${userInput}`);
  res.redirect("/category");
});

module.exports = categoryRouter;
