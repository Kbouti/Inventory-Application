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
  const tags = req.body.tags;
  console.log(`tags: ${tags}`);

  console.log(
    `partName: ${partName}, categoryName: ${categoryName}, quantity: ${quantity}, description: ${description}`
  );

  const categoryId = await queries.findCategoryId(categoryName);
  console.log(`categoryId: ${categoryId}`);

  const response = await queries.newPart(
    partName,
    categoryId,
    quantity,
    description
  );
console.log(`done making part, proceeding to find new part id`);
  const partId = await queries.findPartId(partName);
  // First we needed the category id to make the part, now we need to get the part id to make the partTag relations
console.log(`received partId: ${partId}`);

// ****************************************************************************************************************************************
// ****************************************************************************************************************************************
  // Now for each tag we'll create a reference in the table

  // Here be our error. If doesn't like our for each loop. Is it because tags isn't an array? Perhaps if we only select one tag it's not an array?
  // Idk. Pick up here next. 
  
  tags.forEach((tag) => {
    queries.newPartTag(partId, tag);
  });

// ****************************************************************************************************************************************
// ****************************************************************************************************************************************

  // const partId = queries.findPartId(partName);
  // Now at this point we should have part id and tag ids array, we can use those to populate partsTags table

  res.redirect("/");
};
