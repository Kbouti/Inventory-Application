const queries = require("../database/queries");


const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;


exports.tagGet = async (req, res) => {
    const categories = await queries.getAllCategories();
    const tags = await queries.getAllTags();
  
    res.render("../views/tags", {
      links,
      title,
      categories,
      tags,
      subTitle: "Tags",
    });  
}

exports.tagNewPost = async (req, res) => {
    const tagName = req.body.tag;
    console.log(`You submitted a new tag named: ${tagName}`);
  
    const response = await queries.createTag(tagName);
    // *************************************************************************************
    // Here we would add the new tag to the database
    // *************************************************************************************
  
    // res.redirect("/");
    // Rather than use redirect, this should just refresh the current page:
    res.redirect(req.get("referer"));
}