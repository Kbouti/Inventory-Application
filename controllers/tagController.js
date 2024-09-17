const queries = require("../database/queries");

const staticResources = require("../public/staticResources");
let links = staticResources.links;
let title = staticResources.title;

exports.tagGet = async (req, res) => {
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();

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
  const tagName = req.body.tag;
  console.log(`You submitted a new tag named: ${tagName}`);

  const response = await queries.newTag(tagName);

  // res.redirect("/");
  // Rather than use redirect, this should just refresh the current page:
  res.redirect(req.get("referer"));
};

exports.tag_name = async (req, res) => {
  // This route should display all the parts associated with a specific tag.
  const tagName = req.params.tag_name;
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();
  const partsTags = await queries.getPartTags();
  const tagId = await queries.findTagId(tagName);
  const partIds = await queries.getPartIds(tagId);
  console.log(`tag_name route visited for ${tagName}. part_ids: ${partIds}`);
  const parts = await queries.getPartsById(partIds);

  res.render("../views/pages/tags", {
    links,
    title,
    categories,
    tags,
    parts,
    partsTags,
    subTitle: tagName,
  });
};
