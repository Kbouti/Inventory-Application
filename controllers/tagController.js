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

// ******************************************************************************************************

exports.tag_name = async (req, res) => {
  // This route should display all the parts associated with a specificc tag.
  // First we get the tagName from our request.

  const tagName = req.params.tag_name;
  console.log(`tagName: ${tagName}`);

  // Next fetch all categories
  const categories = await queries.getAllCategories();

  // Next we get all tags
  const tags = await queries.getAllTags();

  // Then we acquire partsTags. This represents the many-to-many relationship between tags and parts
  const partsTags = await queries.getPartTags();

  // Using the tagName from the request we get the tagId for which we want to select all parts.
  const tagId = await queries.findTagId(tagName);

  // Using the id of the selected tag we now find all relavant parts
  const partIds = await queries.getPartIds(tagId);
  console.log(`partIds: ${partIds}`);

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
// ******************************************************************************************************
// ******************************************************************************************************
// I think I might be onto the issue...... I think it's only an issue on the second request pool.query tries to make.
//  The problem isn't my request syntax. That doesn't affect it. The problem is when the query is run: after we've already run a query to get partsIds.
// ******************************************************************************************************
// ******************************************************************************************************
