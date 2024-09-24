const { Client } = require("pg");

require("dotenv").config();


console.log(`accessing env variables to gain db credentials`)
const mode = process.env.MODE;
const user = process.env.USER;
const password = process.env.PASSWORD;
console.log(`received credentials`)

let database;
if (mode == "PRODUCTION") {
  database = process.env.PROD_DB;
} else {
  database = process.env.DEV_DB;
}

const connectionString = `postgresql://${user}:${password}@localhost:5432/${database}`;

const SQL = `

drop table partstags;

drop table parts;

drop table categories;

drop table tags;

`;

async function main() {
  console.log("Deleting all tables");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
