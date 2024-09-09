const queries = require("../database/queries");

// const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../staticResources");
const indexController = require("../controllers/indexController");


let links = staticResources.links;
let title = staticResources.title;



const indexGet = async (req, res) => {
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
}






async function getCategories() {
  const categories = await queries.getAllCategories();
  return categories;
}

async function getTags() {
  const tags = await queries.getAllTags();
  return tags;
}

async function createCategory(name) {
  const response = queries.newCategory(name);
  console.log(`Created new category: ${name}`);
  return;
}

async function createTag(name) {
  const response = queries.newTag(name);
  console.log(`new tag ${name} created`);
  return;
}

module.exports = {
  getCategories,
  getTags,
  createTag,
  createCategory,
  indexGet
};
