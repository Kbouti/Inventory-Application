const express = require("express");
const app = express();

require("dotenv").config();

const indexRouter = require("./routes/indexRouter");
const categoryRouter = require("./routes/categoryRouter");
const partRouter = require("./routes/partRouter");
const tagRouter = require("./routes/tagRouter");

app.use(express.urlencoded({ extended: true }));
// This ^^ is needed to access req.body from the form submission

const PORT = process.env.PORT;
const MODE = process.env.MODE;

const path = require("path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
// Needed to serve static assets (css)

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Needed to support ejs view engine


app.use("/category", categoryRouter);
app.use("/part", partRouter);
app.use("/tag", tagRouter);
app.use("/", indexRouter);

app.listen(PORT, () =>
  console.log(`Inventory App listening in mode ${MODE} on port ${PORT}. May the force be with you.`)
);

// app.get("/", (req, res) => res.send("Hello, world!"));
