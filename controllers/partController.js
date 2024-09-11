const queries = require("../database/queries");

// const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../public/staticResources");
let links = staticResources.links;
let title = staticResources.title;

exports.partGet = async (req, res) => {
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();

  res.render("../views/pages/parts", {
    links,
    title,
    categories,
    tags,
    subTitle: "Parts",
  });
};

exports.partNewPost = async (req, res) => {
  // This is what happens when we submit new part form
  const partName = req.body.part;
  const category = req.body.category;
  const tags = req.body.tag;

  // ******************************************************************************************************
  // Need to validate and sanitise unput.... But first I want to get it operational, worry about that later
  // Need to engage multiple queries in database: 
  // Add part to database
  // Add a new line in the partsTags database for every part-tag relationship
  // ******************************************************************************************************

  console.log(
    `You've submitted the following part name: ${partName}, category: ${category}, with the following tags: ${tags}`
  );
  res.redirect("/");
};
