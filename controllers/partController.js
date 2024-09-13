const queries = require("../database/queries");

// const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../public/staticResources");
let links = staticResources.links;
let title = staticResources.title;

exports.partGet = async (req, res) => {
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();
  const parts = await queries.getAllParts();
  const partsTags = await queries.getPartTags();

  res.render("../views/pages/parts", {
    links,
    title,
    categories,
    tags,
    parts,
    partsTags,
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
  console.log(`post new part activated`);
  const partName = req.body.name;
  console.log(`partName: ${partName}`);


  
  const categoryName = req.body.category;
  console.log(`categoryName: ${categoryName}`);

  const quantity = req.body.quantity;
  console.log(`quantity: ${quantity}`);

  const description = req.body.description;
  const tags = req.body.tags;

  console.log(`req.body resources obtained`);


  const categoryId = await queries.findCategoryId(categoryName);
  console.log(`categoryID obtained: ${categoryId}`);

// Now we're getting categoryId but error'ng on newPart

  const partId = await queries.newPart(
    partName,
    categoryId,
    quantity,
    description
  );

  console.log(`partId obtained`);

  addPartsTags(partId, tags);

  res.redirect("/");
};
