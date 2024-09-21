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

exports.specificTagGet = async (req, res) => {
  console.log(`specificTagGet controller function called`);
  // This route should display all the parts associated with a specific tag.

  const tagId = req.params.tag_id;
  const tagName = await tagQueries.findTagName(tagId);
  const categories = await categoryQueries.getAllCategories();
  const tags = await tagQueries.getAllTags();
  const partsTags = await partsTagsQueries.getPartTags();
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


exports.tagEditGet = async (req, res) => {
  console.log(`tagEditGet route reached. `);

  const tagId = req.params.tag_id;

  const currentTagName = await tagQueries.findTagName(tagId);

res.render("../views/pages/editTag", {
  title,
  links,
  tagId, 
  currentTagName,
  subTitle: "Edit Tag"
})

}