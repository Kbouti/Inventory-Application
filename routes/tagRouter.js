const { Router } = require("express");

const tagRouter = Router();


tagRouter.get("/", async (req, res) => {

    console.log(`tag router reached`);
    res.send("tag router reached");
});

module.exports = tagRouter;