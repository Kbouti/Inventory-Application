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
// Currently not even calling validation.
// ******************************************************************************************************

exports.categoryGet = async (req, res) => {
  console.log(`categoryGet controller function called`);
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
  console.log(`category_nameGet controller function called`);

  const category_id = req.params.category_id;
  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();
  const partsTags = await partsTagsQueries.getPartTags();
  const category_name = await categoryQueries.findCategoryName(category_id);
  const parts = await partQueries.getPartsByCategoryId(category_id);

  res.render("../views/pages/specificCategory", {
    links,
    title,
    categories,
    category_name,
    category_id,
    tags,
    parts,
    partsTags,
    subTitle: category_name,
  });
};

// exports.categoryNewPost = [
//   // console.log(`categoryNewPost controller function called`),
//   validateCategory,
//   async (req, res) => {
//     const userInput = req.body.category;
//     const response = await categoryQueries.newCategory(userInput);
//     res.redirect("/category");
//   },
// ];

exports.categoryNewPost = async (req, res) => {
  console.log(`categoryNewPost controller function called`);
  // validateCategory();
  const userInput = req.body.category;
  const response = await categoryQueries.newCategory(userInput);
  res.redirect("/category");
};

exports.categoryEditGet = async (req, res) => {
  console.log(`categoryEditGet controller function called`);
  // Oops, here we just need to render the form

  const categoryId = req.params.category_id;
  const currentCategoryName = await categoryQueries.findCategoryName(
    categoryId
  );

  res.render("../views/pages/editCategory", {
    title,
    links,
    categoryId,
    currentCategoryName,
    subTitle: "Edit Category",
  });
};

exports.categoryEditPost = async (req, res) => {
  console.log(`categoryEditPost controller function called`);
  const newName = req.body.name;
  const categoryId = req.params.category_id;
  const response = await categoryQueries.editCategory(categoryId, newName);
  res.redirect(`/category/${categoryId}`);
};

exports.categoryDeleteGet = async (req, res) => {
  console.log(`categoryDeleteGet controller function called`);
  // We will create and display a page with a warning that deleting a category will delete all parts under that category
};

exports.categoryDeletePost = async (req, res) => {
  console.log(`categoryDeletePost controller function called`);

  // Need to delete the category and all related parts using queries

  res.send("delete");
};
