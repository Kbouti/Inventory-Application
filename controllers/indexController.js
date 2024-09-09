const queries = require("../database/queries");

// const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../staticResources");

let links = staticResources.links;
let title = staticResources.title;

exports.indexGet = async (req, res) => {
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();
  console.log("Fetched categories and tags");
  res.render("../views/index", {
    links,
    title,
    categories,
    tags,
    subTitle: "Home",
  });
};




exports.getCategories = async () => {
  const categories = await queries.getAllCategories();
  return categories;
};

exports.getTags = async () => {
  const tags = await queries.getAllTags();
  return tags;
};

exports.createCategory = async () => {
  const response = queries.newCategory(name);
  console.log(`Created new category: ${name}`);
  return;
};

exports.createTag = async () => {
  const response = queries.newTag(name);
  console.log(`new tag ${name} created`);
  return;
};

// module.exports = {
//   getCategories,
//   getTags,
//   createTag,
//   createCategory,
//   indexGet,
// };
