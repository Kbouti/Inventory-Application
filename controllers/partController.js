const queries = require("../database/queries");

// const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;

exports.partGet = async (req, res) => {
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();

  res.render("../views/parts", {
    links,
    title,
    categories,
    tags,
    subTitle: "Parts",
  });
};

exports.partNewPost = async (req, res) => {
  const partName = req.body.part;
  const category = req.body.category;
  const tags = req.body.tag;
  // ******************************************************************************************************
  // Ok! Here is where we need middleware functions to handle the user's input.
  // Need to validate and sanitize input
  // ******************************************************************************************************

  console.log(
    `You've submitted the following part name: ${partName}, category: ${category}, with the following tags: ${tags}`
  );
  res.redirect("/");
};
