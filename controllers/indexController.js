const queries = require("../database/queries");

// const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../public/staticResources");

let links = staticResources.links;
let title = staticResources.title;

exports.indexGet = async (req, res) => {
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();
  console.log("Fetched categories and tags");
  res.render("../views/pages/index", {
    links,
    title,
    categories,
    tags,
    subTitle: "Home",
  });
};
