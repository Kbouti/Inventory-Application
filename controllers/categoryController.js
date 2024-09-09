const queries = require("../database/queries");

// const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;

exports.categoryGet = async (req, res) => {
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();

  res.render("../views/categories", {
    links,
    title,
    categories,
    tags,
    subTitle: "Categories",
  });
};


exports.categoryNewPost = async (req, res) => {
    const userInput = req.body.category;
    const response = await queries.newCategory(userInput);
    res.redirect("/category");
}