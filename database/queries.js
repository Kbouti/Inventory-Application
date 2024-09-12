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

// We need to make part names unique for this to work
exports.findPartId = async (partName) => {
  const idQuery = `select id from parts where name = '${partName}';`;
  const { rows } = await pool.query(idQuery);
  const targetId = rows[0].id;
  console.log(`Found targetId: ${targetId} for part name: ${partName}`);
  return targetId;
};

exports.newPart = async (name, category, quantity, description) => {
  const sql = `insert into parts (name, category, quantity, description) values ('${name}', ${category}, ${quantity}, '${description}');`;
  const response = await pool.query(sql);
  const partId = await this.findPartId(name);
  console.log(`done making part, new part ID: ${partId}`);
  return partId;
};

exports.findCategoryId = async (categoryName) => {
  const idQuery = `select id from categories where name = '${categoryName}';`;
  const { rows } = await pool.query(idQuery);
  const targetId = rows[0].id;
  console.log(`Found targetId: ${targetId} for category name: ${categoryName}`);
  return targetId;
};

exports.newPartTag = async (part, tag) => {
  const sql = `insert into partstags (part, tag) values ('${part}','${tag}');`;
  const response = await pool.query(sql);
  return response;
};
