const { Router } = require("express");

const categoryRouter = Router();

const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;

categoryRouter.get("/", async (req, res) => {
  res.render("../views/categories", {
    links,
    title,
    subTitle: "Categories",
  });
});

categoryRouter.post("/new", async (req, res) => {
  const userInput = req.body.category;
  // ******************************************************************************************************
  // Ok! Here is where we need middleware functions to handle the user's input.
  // Need to validate and sanitize input
  // Need to create a new row in the categories table for each user submitted category
  // ******************************************************************************************************

  console.log(`You've submitted the following category name: ${userInput}`);

  res.redirect("/");
});

module.exports = categoryRouter;
