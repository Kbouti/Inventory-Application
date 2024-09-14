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

// ******************************************************************************************************

exports.category_nameGet = async (req, res) => {
  // ******************************************************************************************************
  const category_name = req.params.category_name;
  console.log(`category_name: ${category_name}`);
  // What the FFF this is logging style.css
  // And then the page loads like it should but with no css?????
  // Something very wrong here


  // Fixed the css issue! just need to reword our reference
  // ******************************************************************************************************

  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();
  const partsTags = await queries.getPartTags();
  console.log(`fetched categories, tags, and parts`);

  const category_id = await queries.findCategoryId(category_name);
  console.log(`fetched category_id: ${category_id}`);

  const parts = await queries.getPartsByCategoryId(category_id);

  // res.send("hello");
  // If we just send hello and don't render the page below..... nothing weird happens.

  // When we do send the page below it still first logs correctly, then seems to go through everything again this time with a problem.
  // There's some inception happening


  // res.render("../views/pages/individualCategory", {test: "Testing"});


  res.render("../views/pages/categories", {
    links,
    title,
    categories,
    tags,
    parts: parts,
    partsTags,
    subTitle: "Categories",
  });
  // Ok, we've gotten parts. Now we need a way to render them. We can reuse our parts display module, but we need to put it into our categories template
  // We might need a new view to handle this, idk gotta think about it

  // We need a view for specific category
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
