

// ****************************************************************************************************************

// We're now creating tags and categories in the database. 
// We need to: 
//  -Prevent duplicates from being submitted
//  -Create functions to delete categories and tags (Maybe do that last..)
//  -Create parts in database
//  -Clean up UI with CSS


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


**************************************************************************************************************

CREATE TABLE IF NOT EXISTS parts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 30 ),
  category int,
  quantity int,
  description varchar ( 800 ),
  tags array,
  foreign key (category) references categories(id),
  foreign key (tags) references tags(id)
);


**************************************************************************************************************
This^^ is close but we have an issue
We can't use array as a data type. Instead, we need need to create a join table to represent this many to many relationship

This video:
https://www.youtube.com/watch?v=4q-keGvUnag
The good stuff starts at 6mins

https://www.youtube.com/watch?v=urTwxelK-Xc
https://help.claris.com/en/pro-help/content/many-to-many-relationships.html

**************************************************************************************************************



INSERT INTO categories (name) 
VALUES
  ('Bikes'),
  ('tools'),
  ('cars');

INSERT INTO tags (name) 
VALUES
  ('wrench'),
  ('seatpost'),
  ('tire'),
  ('suspension'); 
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
