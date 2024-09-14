const queries = require("../database/queries");

const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../public/staticResources");
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

  res.render("../views/pages/categories", {
    links,
    title,
    categories,
    tags,
    parts: null,
    subTitle: "Categories",
  });
};

exports.category_nameGet = async (req, res) => {
  const category_name = req.params.category_name;
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();
  const partsTags = await queries.getPartTags();
  const category_id = await queries.findCategoryId(category_name);
  const parts = await queries.getPartsByCategoryId(category_id);

  res.render("../views/pages/categories", {
    links,
    title,
    categories,
    tags,
    parts,
    partsTags,
    subTitle: category_name,
  });
};
// ******************************************************************************************************

exports.categoryNewPost = [
  validateCategory,
  async (req, res) => {
    const userInput = req.body.category;
    const response = await queries.newCategory(userInput);
    res.redirect("/category");
  },
];
