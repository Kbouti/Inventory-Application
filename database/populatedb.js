const { Client } = require("pg");

require("dotenv").config();
console.log(`populateDB file running`);

console.log(`accessing env variables to gain db credentials`)

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




// const mode = process.env.MODE;
// const user = process.env.USER;
// const password = process.env.PASSWORD;
// let database;
// if (mode == "PRODUCTION") {
//   database = process.env.PROD_DB;
// } else {
//   database = process.env.DEV_DB;
// }










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
  ('tire_lever'),
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
    (3, 1);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
