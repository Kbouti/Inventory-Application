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

INSERT INTO categories (category_name) 
VALUES
  ('Bikes'),
  ('tools'),
  ('cars');

INSERT INTO tags (tag_name) 
VALUES
  ('wrench'),
  ('seatpost'),
  ('tire'),
  ('suspension'),
  ('tire lever'),
  ('hardware'); 

  INSERT INTO parts (part_name, category, quantity, description) 
  VALUES
    ('Rockshox Zeb', 1, 1, 'Rockshox enduro fork'),
    ('265mm spoke', 1, 8, 'Spokes for 27.5 rear wheel'),
    ('Spoke wrench', 2, 1, 'spoke wrench for bicycle wheels');

    insert into partsTags (part, tag)
    values 
    (1, 4),
    (2, 1),
    (3, 1),
    (3, 1);

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
