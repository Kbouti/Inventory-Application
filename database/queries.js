const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("select * from categories order by name;");
  return rows;
}

async function getAllTags() {
  const { rows } = await pool.query("select * from tags order by name;");
  return rows;
}

async function newCategory(name) {
  const sql = `insert into categories (name) values ('${name}');`;
  const response = await pool.query(sql);
  return response;
}

async function newTag(name) {
  const sql = `insert into tags (name) values ('${name}');`;
  const response = await pool.query(sql);
  return response;
}

module.exports = {
  getAllCategories,
  getAllTags,
  newCategory,
  newTag,
};
