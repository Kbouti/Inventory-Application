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
  await createSuppliers();
  await createParts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

//  Create brand function:
async function brandCreate(index, name, website, supplier) {
  const brandDetail = { name: name, website: website };
  if (suppliers != false) brandDetail.suppliers = suppliers;
  const brand = new Brand(brandDetail);
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

//   Create category function
async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name} _id: ${category._id}`);
}


//   Create part function
async function partCreate(
  index,
  name,
  description,
  brand,
  price,
  quantity,
  suppliers,
  category,
  imageUrl
) {
  const partDetail = {
    name: name,
    brand: brand,
    price: price,
    quantity: quantity,
    category: category,
    imageUrl: imageUrl,
  };

  if (description != false) {
    partDetail.description = description;
  }

  if (suppliers != false) {
    partDetail.suppliers = suppliers;
  }
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
    categoryCreate(10, "complete bike"),
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

// Finally create parts
async function createParts() {
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
      categories[3],
      "https://www.sram.com/globalassets/image-hierarchy/sram-product-root-images/suspension---forks/suspension---forks/fs-zeb-ultimate-a3/productassets_fs-zeb-ult-a3_fg/fs-zeb-ult-27ub-190-red-44-a3-c-3q-v02-v.png?w=1712&quality=80&format=webp"
    ),
    partCreate(
      1,
      "Lyrik Ultimate",
      "35mm chassis Rockshox fork. Suited for general trail mountain biking. Suitable for bikes in the 140-160 travel range",
      brands[0],
      549,
      2,
      [suppliers[0], suppliers[1], suppliers[2]],
      categories[3],
      "https://www.sram.com/globalassets/image-hierarchy/sram-product-root-images/suspension---forks/suspension---forks/fs-lyrik-ultimate-d2/productassets_fs-lyrk-ult-d2_fg/fs-lyrk-ult-27ub-160-grn-44-d2-c-3q-v02-v.png?w=1712&quality=80&format=webp"
    ),

    partCreate(
      2,
      "Slash",
      "Trek's enduro bike. Long travel for rowdy descents yet pedalable to get you to the top",
      brands[1],
      9399.99,
      1,
      [],
      categories[10],
      "https://media.trekbikes.com/image/upload/f_auto,fl_progressive:semi,q_auto,w_1920,h_1440,c_pad/Slash99XOAXS-24-41681-B-Portrait"
    ),
  ]);
}
