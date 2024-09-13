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
    subTitle: "Categories",
  });
};

// ******************************************************************************************************

exports.category_name = async (req, res) => {
  const category_name = req.params.category_name;

  console.log(`category_name: ${category_name}`);
  // BOOM, we've accessed the request parameters.

  const category_id = await queries.findCategoryId(category_name);
  console.log(`category_id: ${category_id}`);

  const parts = await queries.getPartsByCategoryId(category_id);

  parts.forEach((part) => {
    console.log(`part.part_name: ${part.part_name}`);
  });
// Ok, we've gotten parts. Now we need a way to render them. We can reuse our parts display module, but we need to put it into our categories template
// We might need a new view to handle this, idk gotta think about it
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
