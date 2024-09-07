const { Router } = require("express");

const tagRouter = Router();
const indexController = require("../controllers/indexController");
const staticResources = require("../staticResources");

let links = staticResources.links;
let title = staticResources.title;
let tags = staticResources.tags;

tagRouter.get("/", async (req, res) => {
  const categories = await indexController.getCategories();

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

  // *************************************************************************************
  // Here we would add the new tag to the database
  // *************************************************************************************

  // res.redirect("/");
  // Rather than use redirect, this should just refresh the current page:
  res.redirect(req.get("referer"));
});

module.exports = tagRouter;
