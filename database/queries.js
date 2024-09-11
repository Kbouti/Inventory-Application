const pool = require("./pool");

exports.getAllCategories = async () => {
  const { rows } = await pool.query("select * from categories order by name;");
  return rows;
};

exports.getAllTags = async () => {
  const { rows } = await pool.query("select * from tags order by name;");
  return rows;
};

exports.newCategory = async (name) => {
  const sql = `insert into categories (name) values ('${name}');`;
  const response = await pool.query(sql);
  return response;
};

exports.newTag = async (name) => {
  const sql = `insert into tags (name) values ('${name}');`;
  const response = await pool.query(sql);
  return response;
};

exports.newPart = async (name, category, quantity, description) => {
  console.log(`newPart query activated in database for part name ${name}`);

  const sql = `insert into parts (name, category, quantity, description) values ('${name}', ${category}, ${quantity}, '${description}');`;

  console.log(`sql command: ${sql}`);

  const response = await pool.query(sql);
  // console.log(`response: ${response}`);
  // Now we want to get the id of the part we just created and return that. We can use it to create tag associations
console.log(`done making part`);
  return response;
};

exports.findCategoryId = async (categoryName) => {
  console.log(`Seeking id for category name: ${categoryName}`);
  const idQuery = `select id from categories where name = '${categoryName}';`;
  const {rows } = await pool.query(idQuery);
  const targetId = rows[0].id;
  console.log(`targetId: ${targetId}`);
  return targetId;
};

// We need to make part names unique for this to work
exports.findPartId = async (partName) => {
  console.log(`Seeking id for part name: ${partName}`);
  const idQuery = `select id from parts where name = '${partName}';`;
  const {rows} = await pool.query(idQuery);
  const targetId = rows[0].id;
  console.log(`targetId: ${targetId}`);
  return targetId;
};

exports.newPartTag = async (part, tag) => {
  // We'll need to invoke this for each part/tag relationship we establish. So between 0 - X times for each new part we make

  const sql = `insert into partstags (part, tag) values ('${part}','${tag}');`;
  console.log(`sql: `);
  console.log(sql);
  const response = await pool.query(sql);
  return response;
};
