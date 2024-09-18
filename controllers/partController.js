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

  const selectedPartId = null;

  res.render("../views/pages/parts", {
    links,
    title,
    categories,
    tags,
    parts,
    partsTags,
    selectedPartId,
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
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();
  const parts = await queries.getAllParts();
  const partsTags = await queries.getPartTags();

  const selectedPartId = req.params.part_id;
  console.log(`selectedPartId: ${selectedPartId}`);

  // Maybe we want the whole part object not just the id

  const response = await queries.getPartsById(selectedPartId);
  const selectedPart = response[0];

  res.render("../views/pages/parts", {
    links,
    title,
    categories,
    tags,
    parts,
    partsTags,
    selectedPartId,
    selectedPart,
    subTitle: "Parts",
  });
};

exports.deletePart = async (req, res) => {
  const part_id = req.params.part_id;
  console.log(`Delete part post route reached. part_id: ${part_id}`);
  // First we have to delete partsTags relations, then delete part.
  const partsTagsResponse = await queries.deletePartsTags(part_id);
  const partResponse = await queries.deletePart(part_id);
  res.redirect("/part");
};

// ******************************************************************************************************

exports.editPart = async (req, res) => {
  const part_id = req.params.part_id;

  console.log(`edit part route reached. part_id: ${part_id}`);

  res.send(`edit part route reached. part_id: ${part_id}`);
};
