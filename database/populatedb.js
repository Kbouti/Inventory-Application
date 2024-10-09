const { Client } = require("pg");

require("dotenv").config();
console.log(`populateDB file running`);

console.log(`accessing env variables to gain db credentials`);

const mode = process.env.MODE;

let database;
let user;
let password;
let host;
let connectionString;

if (mode == "PRODUCTION") {
  database = process.env.PGDATABASE;
  user = process.env.PGUSER;
  password = process.env.PGPASSWORD;
  host = process.env.PGHOST;
  connectionString = process.env.DATABASE_URL;
} else {
  database = process.env.DEV_DB;
  user = process.env.DEV_USER;
  password = process.env.DEV_PASSWORD;
  host = process.env.DEV_HOST;
  connectionString = `postgresql://${user}:${password}@localhost:5432/${database}`;
}

const populateTablesSQL = `
CREATE TABLE IF NOT EXISTS categories (
  category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_name VARCHAR ( 20 )
);

CREATE TABLE IF NOT EXISTS tags (
  tag_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tag_name VARCHAR ( 20 )
);


CREATE TABLE IF NOT EXISTS parts (
  part_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  part_name VARCHAR ( 30 ),
  category int,
  quantity int,
  description varchar ( 800 ),
  foreign key (category) references categories(category_id)
);

CREATE TABLE IF NOT EXISTS partsTags (
  partsTagsId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  part int,
  tag int,
  foreign key (part) references parts(part_id),
  foreign key (tag) references tags(tag_id)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(populateTablesSQL);
  await client.end();
  console.log("done");
}

main();
