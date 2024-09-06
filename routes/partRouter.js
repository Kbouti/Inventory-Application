const { Router } = require("express");

const partRouter = Router();


partRouter.get("/", async (req, res) => {

    console.log(`part router reached`);
    res.send("part router reached");
});

module.exports = partRouter;