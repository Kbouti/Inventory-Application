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

async function addPartsTags(partId, tagIds) {
  console.log(`adding part tag relations`);
  if (tagIds.length > 1) {
    // Assigning several tags
    tagIds.forEach((tag) => {
      queries.newPartTag(partId, tag);
    });
  } else if (tagIds.length == 1) {
    // Assigning one tag
    queries.newPartTag(partId, tagIds[0]);
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
  // Remember, this only works if all parts have unique names^^
  res.redirect("/part");
};


exports.selectedPartGet = async (req, res) => {
  const selectedPartId = req.params.part_id;
  console.log(`selectedPartId: ${selectedPartId}`);
  res.send("Sup broseph");
}
// Now we need to create a link to this route