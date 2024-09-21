const partQueries = require("../database/queries/partQueries");
const categoryQueries = require("../database/queries/categoryQueries");
const partsTagsQueries = require("../database/queries/partsTagsQueries");
const tagQueries = require("../database/queries/tagQueries");

const staticResources = require("../public/staticResources");
let links = staticResources.links;
let title = staticResources.title;

exports.tagGet = async (req, res) => {
  console.log(`tagGet controller function called`);

  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();

  res.render("../views/pages/tags", {
    links,
    title,
    categories,
    tags,
    parts: null,
    subTitle: "Tags",
  });
};

exports.tagNewPost = async (req, res) => {
  console.log(`tagNewPost controller function called`);

  const tagName = req.body.tag;
  console.log(`You submitted a new tag named: ${tagName}`);

  const response = await tagQueries.newTag(tagName);

  // res.redirect("/");
  // Rather than use redirect, this should just refresh the current page:
  res.redirect(req.get("referer"));
};

exports.tag_name = async (req, res) => {
  console.log(`tag_name controller function called`);
  // This route should display all the parts associated with a specific tag.

// ************************************************************************************************************************
const tagName = req.params.tag_name;
// This should prbably be based on tag_id, not tag_name. 
// We've created a new view for specificTag, we need to create a small form element to edit or delete the tag. 
// ************************************************************************************************************************

  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();
  const partsTags = await partsTagsQueries.getPartTags();
  const tagId = await tagQueries.findTagId(tagName);
  const partIds = await partQueries.getPartIds(tagId);
  console.log(`tag_name route visited for ${tagName}. part_ids: ${partIds}`);
  const parts = await partQueries.getPartsById(partIds);

  res.render("../views/pages/specificTag", {
    links,
    title,
    categories,
    tags,
    parts,
    partsTags,
    tagId, 
    tagName,
  });
};
