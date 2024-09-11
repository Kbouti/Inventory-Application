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
  tagIds.forEach((id) => {
    queries.newPartTag(partId, id);
  });
  console.log(`done adding partTag relations`);
}

exports.partNewPost = async (req, res) => {
  console.log(`part/new post route activated`);

  const partName = req.body.name;
  const categoryName = req.body.category;
  const quantity = req.body.quantity;
  const description = req.body.description;

  console.log(
    `partName: ${partName}, categoryName: ${categoryName}, quantity: ${quantity}, description: ${description}`
  );

  const categoryId = await queries.findCategoryId(categoryName);
  console.log(`categoryId: ${categoryId}`);

  const tags = req.body.tags;
  console.log(`tags: ${tags}`);

  // ************************************************************************************************************************************************
  // Ok we need to get the id number of the category, not the name, to pass to the following function
  // ************************************************************************************************************************************************

  const response = await queries.newPart(
    partName,
    categoryId,
    quantity,
    description
  );

  // const partId = queries.findPartId(partName);
  // Now at this point we should have part id and tag ids array, we can use those to populate partsTags table

  res.redirect("/");
};
