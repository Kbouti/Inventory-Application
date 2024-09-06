const { Router } = require("express");

const tagRouter = Router();
const staticResources = require("../staticResources");
let links = staticResources.links;
let title = staticResources.title;


tagRouter.get("/", async (req, res) => {
    res.render("../views/tags", {
        links,
        title,
        subTitle: "Tags",
      });
});


tagRouter.post("/new", async (req, res) => {
  const tagName = req.body.tag;
  console.log(`You submitted a new tag named: ${tagName}`);

// *************************************************************************************
// Here we would add the new tag to the database
// *************************************************************************************

  // res.redirect("/");
  // Rather than use redirect, this should just refresh the current page:
  res.redirect(req.get('referer'));
});



module.exports = tagRouter;