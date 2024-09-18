const partQueries = require("../database/queries/partQueries");
const categoryQueries = require("../database/queries/categoryQueries");
const partsTagsQueries = require("../database/queries/partsTagsQueries");
const tagQueries = require("../database/queries/tagQueries");

// const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../public/staticResources");

let links = staticResources.links;
let title = staticResources.title;

exports.indexGet = async (req, res) => {
  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();
  console.log("Fetched categories and tags");
  res.render("../views/pages/index", {
    links,
    title,
    categories,
    tags,
    subTitle: "Home",
  });
};
