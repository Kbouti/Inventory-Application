const queries = require("../database/queries");

const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;

// ******************************************************************************************************

const validateCategory = [
  body("category").trim().isAlpha().withMessage("Must contain only letters"),
];

// Our validation isn't working.... Still able to submit categories with numbers and spaces

// ******************************************************************************************************

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

exports.categoryNewPost = [
  validateCategory,
  async (req, res) => {
    const userInput = req.body.category;
    const response = await queries.newCategory(userInput);
    res.redirect("/category");
  },
];
