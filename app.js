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



// *********************************************************************************
// Next up DATABASE

// We need to initiate and access our database and tables
// We've created two databases, one for development, one for production. They're both defined in .env and database/pool determines which one to use. 


// *********************************************************************************



app.use("/category", categoryRouter);
app.use("/part", partRouter);
app.use("/tag", tagRouter);
app.use("/", indexRouter);

app.listen(PORT, () =>
  console.log(`My first Express app - listening mode ${MODE} on port ${PORT}!`)
);

// app.get("/", (req, res) => res.send("Hello, world!"));
