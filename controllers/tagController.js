const queries = require("../database/queries");

const staticResources = require("../public/staticResources");
let links = staticResources.links;
let title = staticResources.title;

exports.tagGet = async (req, res) => {
  const categories = await queries.getAllCategories();
  const tags = await queries.getAllTags();

  res.render("../views/pages/allTags", {
    links,
    title,
    categories,
    tags,
    subTitle: "Tags",
  });
};

exports.tagNewPost = async (req, res) => {
  const tagName = req.body.tag;
  console.log(`You submitted a new tag named: ${tagName}`);

  const response = await queries.newTag(tagName);
  // *************************************************************************************
  // Here we would add the new tag to the database
  // *************************************************************************************

  // res.redirect("/");
  // Rather than use redirect, this should just refresh the current page:
  res.redirect(req.get("referer"));
};



// ******************************************************************************************************

exports.tag_name = async (req, res) => {
  console.log(`req.params.tag_name: ${req.params.tag_name}`);
  // BOOM, we've accessed the request parameters. 

  // We can now search our database for a tags with this name, and then display all it's associated parts. 
  // On the category main page we'll want to have links to all the categories. 
}
// ******************************************************************************************************
