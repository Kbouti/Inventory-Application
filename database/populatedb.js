

// ****************************************************************************************************************
// This works!!!!!
// We can now create a database on command and add a couple categories. 

// And BOOOOM We're fetching categories from the database before we're rending our views. 
// Next up we need to write queries to create and remove categories
// We could also do the same with tags
// parts we'll do last as the part will need to reference both a category and potentially tags
// ****************************************************************************************************************





const { Client } = require("pg");

require("dotenv").config();

const mode = process.env.MODE;
const user = process.env.USER;
const password = process.env.PASSWORD;
let database;
if (mode == "PRODUCTION") {
  database = process.env.PROD_DB;
} else {
  database = process.env.DEV_DB;
}

const connectionString = `postgresql://${user}:${password}@localhost:5432/${database}`;

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 20 )
);

CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 20 )
);

INSERT INTO categories (name) 
VALUES
  ('Bikes'),
  ('tools'),
  ('cars');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
