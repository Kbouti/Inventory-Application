const { Pool } = require("pg");

console.log(`accessing env variables to gain db credentials`);

const mode = process.env.MODE;
// const user = process.env.USER;
// const password = process.env.PASSWORD;
let database;
let user;
let password;
let host

if (mode == "PRODUCTION") {
  database = process.env.PGDATABASE;
  user = process.env.PGUSER;
  password = process.env.PGPASSWORD;
  host = process.env.PGHOST;

} else {
  database = process.env.DEV_DB;
  user = process.env.DEV_USER;
  password = process.env.DEV_PASSWORD;
  host = process.env.DEV_HOST;

};

console.log(`received credentials`);
console.log(`initializing pool`);

module.exports = new Pool({
  host, // or wherever the db is hosted
  user,
  database,
  password,
  port: 5432, // The default port
});
