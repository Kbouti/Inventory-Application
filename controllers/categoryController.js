const partQueries = require("../database/queries/partQueries");
const categoryQueries = require("../database/queries/categoryQueries");
const partsTagsQueries = require("../database/queries/partsTagsQueries");
const tagQueries = require("../database/queries/tagQueries");



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
  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();

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
  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();
  const partsTags = await partsTagsQueries.getPartTags();
  const category_id = await categoryQueries.findCategoryId(category_name);
  const parts = await partQueries.getPartsByCategoryId(category_id);

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
    const response = await categoryQueries.newCategory(userInput);
    res.redirect("/category");
  },
];
