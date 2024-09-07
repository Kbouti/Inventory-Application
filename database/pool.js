const { Pool } = require("pg");

const mode = process.env.MODE;
const user = process.env.USER;
const password = process.env.PASSWORD;
let database;

if (mode == "PRODUCTION") {
  database = process.env.PROD_DB;
} else {
  database = process.env.DEV_DB;
};

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: user,
  database: database,
  password: password,
  port: 5432, // The default port
});
