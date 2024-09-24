const { Client } = require("pg");

require("dotenv").config();
console.log(`dropTables file running`);


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
  connectionString = process.env.DATABASE_URL

} else {
  database = process.env.DEV_DB;
  user = process.env.DEV_USER;
  password = process.env.DEV_PASSWORD;
  host = process.env.DEV_HOST;
  connectionString = `postgresql://${user}:${password}@localhost:5432/${database}`;
};
const SQL = `

drop table partstags;

drop table parts;

drop table categories;

drop table tags;

`;

async function main() {
  console.log("Deleting all tables");
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
