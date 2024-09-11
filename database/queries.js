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


exports.newPart = async (name, category, quantity, description ) => {
  const sql = `insert into parts (name, category, quantity, description) values ('${name}', ${category}, ${quantity}, '${description}');`
  const response = await pool.query(sql);
  return response;

};

exports.newPartTag = async (part, tag ) => {
// We'll need to invoke this for each part/tag relationship we establish. So between 0 - X times for each new part we make

const sql = `insert into partstags (part, tag) values ('${part}','${tag}');`
const response = await pool.query(sql);
return response;

};