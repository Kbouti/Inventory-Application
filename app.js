const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;
const MODE = process.env.MODE;


app.listen(PORT, () =>
  console.log(`My first Express app - listening mode ${MODE} on port ${PORT}!`)
);

app.get("/", (req, res) => res.send("Hello, world!"));
