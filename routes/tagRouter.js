const { Router } = require("express");

const tagRouter = Router();
const indexController = require("../controllers/indexController");
const staticResources = require("../staticResources");
const queries = require("../database/queries");


let links = staticResources.links;
let title = staticResources.title;

tagRouter.get("/", async (req, res) => {
  const categories = await indexController.getCategories();
  const tags = await indexController.getTags();

  res.render("../views/tags", {
    links,
    title,
    categories,
    tags,
    subTitle: "Tags",
  });
});

tagRouter.post("/new", async (req, res) => {
  const tagName = req.body.tag;
  console.log(`You submitted a new tag named: ${tagName}`);

  const response = await indexController.createTag(tagName);
  // *************************************************************************************
  // Here we would add the new tag to the database
  // *************************************************************************************

  // res.redirect("/");
  // Rather than use redirect, this should just refresh the current page:
  res.redirect(req.get("referer"));
});

module.exports = tagRouter;
