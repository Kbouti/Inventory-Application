const partQueries = require("../database/queries/partQueries");
const categoryQueries = require("../database/queries/categoryQueries");
const partsTagsQueries = require("../database/queries/partsTagsQueries");
const tagQueries = require("../database/queries/tagQueries");

// const { body, validationResult } = require("express-validator");
// Still unsure of how to use this to validate

const staticResources = require("../public/staticResources");
let links = staticResources.links;
let title = staticResources.title;

exports.partGet = async (req, res) => {
  console.log(`partGet controller function called`);

  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();
  const parts = await partQueries.getAllParts();
  const partsTags = await partsTagsQueries.getPartTags();

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
  console.log(`addPartsTags controller function called`);
  console.log(`adding part tag relations`);
  if (tagIds == null) {
    console.log(`no tagIds found`);
  } else if (tagIds.length > 1) {
    // Assigning several tags
    tagIds.forEach((tag) => {
      partsTagsQueries.newPartTag(partId, tag);
    });
  } else if (tagIds.length == 1) {
    // Assigning one tag
    partsTagsQueries.newPartTag(partId, tagIds[0]);
  }
  console.log(`done adding partTag relations`);
  return;
}

exports.partNewPost = async (req, res) => {
  console.log(`partNewPost controller function called`);

  const partName = req.body.name;
  const categoryName = req.body.category;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const tags = req.body.tags;
  const categoryId = await categoryQueries.findCategoryId(categoryName);
  const partId = await partQueries.newPart(
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
  console.log(`selectedPartGet controller function called`);

  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();
  const parts = await partQueries.getAllParts();
  const partsTags = await partsTagsQueries.getPartTags();

  // ************************************************************************
  const selectedPartId = req.params.part_id;
  // const selectedPartId = req.body.part_id;

  console.log(`selectedPartId: ${selectedPartId}`);

  const response = await partQueries.getPartsById(selectedPartId);
  const selectedPart = response[0];

  res.render("../views/pages/specificPart", {
    title,
    links,
    selectedPart,
    categories,
    tags,
    parts,
    partsTags,
  });
};

exports.deletePart = async (req, res) => {
  console.log(`deletePart controller function called`);

  const part_id = req.params.part_id;
  console.log(`Delete part post route reached. part_id: ${part_id}`);
  // First we have to delete partsTags relations, then delete part.
  const partsTagsResponse = await partsTagsQueries.deletePartsTags(part_id);
  const partResponse = await partQueries.deletePart(part_id);
  res.redirect("/part");
};

// ******************************************************************************************************

exports.editPartGet = async (req, res) => {
  console.log(`editPartGet controller function called`);

  const part_id = req.params.part_id;
  console.log(`edit part route reached. part_id: ${part_id}`);

  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();
  const parts = await partQueries.getAllParts();
  const partsTags = await partsTagsQueries.getPartTags();

  const startingTags = await partsTagsQueries.getTagsByPart(part_id);
  console.log(`startingTags: ${startingTags}`);

  const response = await partQueries.getPartsById(part_id);
  const selectedPart = response[0];

  res.render("../views/pages/editPart", {
    links,
    title,
    categories,
    tags,
    parts,
    partsTags,
    part_id,
    selectedPart,
    startingTags,
    subTitle: "Edit Part",
  });
};

exports.editPartPost = async (req, res) => {
  console.log(`editPartPost controller function called`);

  const part_id = req.params.part_id;
  const newName = req.body.name;
  const newQuantity = req.body.quantity;
  const newDescription = req.body.description;
  const newCategoryName = req.body.category;
  const newTags = req.body.tags;

  const newCategory = await categoryQueries.findCategoryId(newCategoryName);

  const newDetails = {
    newName,
    newQuantity,
    newDescription,
    newCategory,
    newTags,
  };

  const response = await partQueries.editPartDetails(part_id, newDetails);
  // First update part details

  // Then remove old tags
  const response2 = await partsTagsQueries.deletePartsTags(part_id);

  // Then assign new ones
  const response3 = await addPartsTags(part_id, newTags);

  res.redirect(`/part/${part_id}`);
};
