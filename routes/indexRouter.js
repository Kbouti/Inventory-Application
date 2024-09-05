const { Router } = require("express");

const indexRouter = Router();

const indexController = require("../controllers/indexController");

indexRouter.get("/", async (req, res) => {
// Here we would likely first want to access our database to get our inventory data, then we'd pass it to the view to render it. 


    res.render("../views/index", { title: "Inventory Application" });
  });


  module.exports = indexRouter