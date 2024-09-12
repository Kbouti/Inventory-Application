// ****************************************************************************************************************

// We're now creating tags and categories in the database.
// We need to:
//  -Prevent duplicates from being submitted AKA sanitize and validate forms
//  -Create functions to delete categories and tags (Maybe do that last..)
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


CREATE TABLE IF NOT EXISTS parts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 30 ),
  category int,
  quantity int,
  description varchar ( 800 ),
  foreign key (category) references categories(id)
);

CREATE TABLE IF NOT EXISTS partsTags (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  part int,
  tag int,
  foreign key (part) references parts(id),
  foreign key (tag) references tags(id)
);

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
  ('suspension'),
  ('tire lever'),
  ('hardware'),
  ('wrench'); 

  INSERT INTO parts (name, category, quantity, description) 
  VALUES
    ('Rockshox Zeb', 1, 1, 'Rockshox enduro fork'),
    ('265mm spoke', 1, 8, 'Spokes for 27.5 rear wheel'),
    ('Spoke wrench', 2, 1, 'spoke wrench for bicycle wheels');

    insert into partsTags (part, tag)
    values 
    (1, 4),
    (2, 7),
    (3, 1),
    (3, 7);

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
