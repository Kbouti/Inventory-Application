#! /usr/bin/env node

console.log(
  'This script populates some test parts, brands, categories, and suppliers to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Brand = require("./models/brand");
const Category = require("./models/category");
const Part = require("./models/part");
const Supplier = require("./models/supplier");

const brands = [];
const categories = [];
const parts = [];
const suppliers = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createBrands();
  await createCategories();
  await createParts();
  await createSuppliers();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

//  My attempt at create brand function:
async function brandCreate(index, name, website, supplier) {
  const brandDetail = { name: name, website: website };
  if (suppliers != false) brandDetail.suppliers = suppliers;
  const brand = new Brand(brandDetail);
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

//   Attempt at category function
async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}


// ******************************************************************************************************************************************************************
// NOTE: 

// Need to add to part:
// -Category
// -URL
// -link
// -image

// ******************************************************************************************************************************************************************
// Should we maybe be getting this from an api somehow rather than hard coding our examples?
// ******************************************************************************************************************************************************************


//   Attempted part function
async function partCreate(
  index,
  name,
  description,
  brand,
  price,
  quantity,
  suppliers
) {
  const partDetail = {
    name: name,
    brand: brand,
    price: price,
    quantity: quantity,
  };
  if (description != false) partDetail.description = description;
  if (suppliers != false) partDetail.suppliers = suppliers;
  const part = new Part(partDetail);
  await part.save();
  parts[index] = part;
  console.log(`Added part: ${name}`);
}

async function supplierCreate(
  index,
  name,
  website,
  brands,
  username,
  password
) {
  const supplierDetail = { name: name, website: website };
  if (brands != false) supplierDetail.brands = brands;
  if (username != false) supplierDetail.username = username;
  if (password != false) supplierDetail.password = password;
  const supplier = new Supplier(supplierDetail);
  await supplier.save();
  suppliers[index] = supplier;
  console.log(`Added supplier: ${name}`);
}

async function createBrands() {
  console.log(`Adding brands`);
  await Promise.all([
    brandCreate(0, "RockShox", "https://www.sram.com/en/rockshox", false),
    brandCreate(1, "Trek", "https://www.trekbikes.com/us/en_US/", false),
    brandCreate(2, "Wolf Tooth", "https://www.wolftoothcomponents.com/", false),
    brandCreate(3, "Sram", "https://www.sram.com/en/sram", false),
  ]);
}

// Next up create categories:
async function createCategories() {
  console.log(`Adding categories`);
  await Promise.all([
    categoryCreate(0, "wheels"),
    categoryCreate(1, "tires"),
    categoryCreate(2, "cockpit"),
    categoryCreate(3, "fork"),
    categoryCreate(4, "suspension"),
    categoryCreate(5, "drivetrain"),
    categoryCreate(6, "saddle"),
    categoryCreate(7, "pedals"),
    categoryCreate(8, "accessories"),
    categoryCreate(9, "rear shock"),
  ]);
}

async function createParts() {
  // ******************************************************************************************************************************************************************
  // Just two parts to get started and make sure we're doing things right. 

  console.log(`Adding parts`);
  await Promise.all([
    partCreate(
      0,
      "Zeb Ultimate",
      "38mm chassis Rockshox fork. Suited for enduro and freeride moutain biking. Put this on your big bike that pedals.",
      brands[0],
      579,
      4,
      [suppliers[0], suppliers[1], suppliers[2]],
    ),
    partCreate(
      1,
      "Lyrik Ultimate",
      "38mm chassis Rockshox fork. Suited for enduro and freeride moutain biking. Put this on your big bike that pedals.",
      brands[0],
      549,
      2,
      [suppliers[0], suppliers[1], suppliers[2]],
    ),
  ]);
}

async function createSuppliers() {
  console.log(`Adding suppliers`);
  await Promise.all([
    supplierCreate(
      0,
      "qbp",
      "https://www.qbp.com/",
      [brands[0], brands[2], brands[3]],
      "qbpUsername",
      "qbpPassword"
    ),
    supplierCreate(
      1,
      "Amazon",
      "https://www.amazon.com/",
      [brands[0], brands[2], brands[3]],
      "amazonUsername",
      "amazonPassword123"
    ),
    supplierCreate(
      2,
      "The Lost Co",
      "https://thelostco.com/",
      [brands[0]],
      false,
      false
    ),
  ]);
}

// Next up products

// Before getting too deep into data creation...... I commentted the below and ran node populatedb.js, we got an error.
// I'm thinking about starting over...

//  ********************************************************************************************************
//  Template code below this line
//  ********************************************************************************************************

// async function createGenres() {
//   console.log("Adding genres");
//   await Promise.all([
//     genreCreate(0, "Fantasy"),
//     genreCreate(1, "Science Fiction"),
//     genreCreate(2, "French Poetry"),
//   ]);
// }

// async function createAuthors() {
//   console.log("Adding authors");
//   await Promise.all([
//     authorCreate(0, "Patrick", "Rothfuss", "1973-06-06", false),
//     authorCreate(1, "Ben", "Bova", "1932-11-8", false),
//     authorCreate(2, "Isaac", "Asimov", "1920-01-02", "1992-04-06"),
//     authorCreate(3, "Bob", "Billings", false, false),
//     authorCreate(4, "Jim", "Jones", "1971-12-16", false),
//   ]);
// }

// async function createBooks() {
//   console.log("Adding Books");
//   await Promise.all([
//     bookCreate(
//       0,
//       "The Name of the Wind (The Kingkiller Chronicle, #1)",
//       "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
//       "9781473211896",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       1,
//       "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
//       "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
//       "9788401352836",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       2,
//       "The Slow Regard of Silent Things (Kingkiller Chronicle)",
//       "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
//       "9780756411336",
//       authors[0],
//       [genres[0]]
//     ),
//     bookCreate(
//       3,
//       "Apes and Angels",
//       "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
//       "9780765379528",
//       authors[1],
//       [genres[1]]
//     ),
//     bookCreate(
//       4,
//       "Death Wave",
//       "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
//       "9780765379504",
//       authors[1],
//       [genres[1]]
//     ),
//     bookCreate(
//       5,
//       "Test Book 1",
//       "Summary of test book 1",
//       "ISBN111111",
//       authors[4],
//       [genres[0], genres[1]]
//     ),
//     bookCreate(
//       6,
//       "Test Book 2",
//       "Summary of test book 2",
//       "ISBN222222",
//       authors[4],
//       false
//     ),
//   ]);
// }

// async function createBookInstances() {
//   console.log("Adding authors");
//   await Promise.all([
//     bookInstanceCreate(
//       0,
//       books[0],
//       "London Gollancz, 2014.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(1, books[1], " Gollancz, 2011.", false, "Loaned"),
//     bookInstanceCreate(2, books[2], " Gollancz, 2015.", false, false),
//     bookInstanceCreate(
//       3,
//       books[3],
//       "New York Tom Doherty Associates, 2016.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(
//       4,
//       books[3],
//       "New York Tom Doherty Associates, 2016.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(
//       5,
//       books[3],
//       "New York Tom Doherty Associates, 2016.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(
//       6,
//       books[4],
//       "New York, NY Tom Doherty Associates, LLC, 2015.",
//       false,
//       "Available"
//     ),
//     bookInstanceCreate(
//       7,
//       books[4],
//       "New York, NY Tom Doherty Associates, LLC, 2015.",
//       false,
//       "Maintenance"
//     ),
//     bookInstanceCreate(
//       8,
//       books[4],
//       "New York, NY Tom Doherty Associates, LLC, 2015.",
//       false,
//       "Loaned"
//     ),
//     bookInstanceCreate(9, books[0], "Imprint XXX2", false, false),
//     bookInstanceCreate(10, books[1], "Imprint XXX3", false, false),
//   ]);
// }
