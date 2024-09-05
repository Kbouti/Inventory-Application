const { Router } = require("express");

const indexRouter = Router();

const indexController = require("../controllers/indexController");


// ************************************************************************************
// These declarations might be best in app.js, not sure

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New Category" },
];
const title = "Inventory Application";

// ************************************************************************************

indexRouter.get("/", async (req, res) => {
  // Here we would likely first want to access our database to get our inventory data, then we'd pass it to the view to render it.
  res.render("../views/index", {
    links,
    title,
    subTitle: "Home",
  });
});

indexRouter.get("/new", async (req, res) => {
  // Here we would likely first want to access our database to get our inventory data, then we'd pass it to the view to render it.
  res.render("../views/createCategory", {
    links,
    title,
    subTitle: "New Category",
  });
});

indexRouter.post("/new", async (req, res) => {
  // Here we would likely first want to access our database to get our inventory data, then we'd pass it to the view to render it.
  res.send("You've sent the form");
});

indexRouter.get("/:category", async (req, res) => {
  // Here we will eventually render all the parts in this category, as well as any forms to alter this category
  res.render("../views/index/category", {
    title,
    subTitle: "Create a Category",
  });
});

module.exports = indexRouter;
