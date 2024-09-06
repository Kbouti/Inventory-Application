const { Router } = require("express");

const categoryRouter = Router();


categoryRouter.get("/", async (req, res) => {

    console.log(`category router reached`);
    res.send("category router reached");
});

module.exports = categoryRouter;