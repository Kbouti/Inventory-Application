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
  console.log(`You've submitted the following category name: ${userInput}`);

  const response = await queries.newCategory(userInput);

  // ******************************************************************************************************
  // Ok! Here is where we need middleware functions to handle the user's input.
  // Need to validate and sanitize input
  // Need to create a new row in the categories table for each user submitted category
  // --Create a query function in database/queries, import and use it here
  // ******************************************************************************************************

  console.log(`You've submitted the following category name: ${userInput}`);

  res.redirect("/");
});

module.exports = categoryRouter;
