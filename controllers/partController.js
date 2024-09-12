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

// Need a function that takes a part id and all the associated tag ids and adds the relationships to the database

async function addPartsTags(partId, tagIds) {
  console.log(`adding part tag relations`);
  if (tagIds.length > 1) {
    // Assigning several tags
    tagIds.forEach((tag) => {
      queries.newPartTag(partId, tag);
    });
  } else if (tagIds.length == 1) {
    // Assigning one tag
    queries.newPartTag(partId, tags);
  }

  console.log(`done adding partTag relations`);
}

exports.partNewPost = async (req, res) => {
  const partName = req.body.name;
  const categoryName = req.body.category;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const tags = req.body.tags;

  const categoryId = await queries.findCategoryId(categoryName);

  const partId = await queries.newPart(
    partName,
    categoryId,
    quantity,
    description
  );

  addPartsTags(partId, tags);

  res.redirect("/");
};
