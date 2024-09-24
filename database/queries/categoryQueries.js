const pool = require("../pool");

exports.getAllCategories = async () => {
  console.log(`query getAllCategories triggered`);
  const { rows } = await pool.query(
    "select * from categories order by category_name;"
  );
  return rows;
};

exports.newCategory = async (name) => {
  console.log(`query newCategory triggered`);

  const sql = `insert into categories (category_name) values ('${name}');`;
  const response = await pool.query(sql);
  return response;
};

exports.findCategoryId = async (categoryName) => {
  console.log(`query findCategoryId triggered`);

  const idQuery = `select category_id from categories where category_name = '${categoryName}';`;
  const { rows } = await pool.query(idQuery);
  const targetId = rows[0].category_id;
  return targetId;
};

exports.findCategoryName = async (categoryId) => {
  console.log(`query findCategoryName triggered`);

  const idQuery = `select category_name from categories where category_id = '${categoryId}';`;
  const { rows } = await pool.query(idQuery);
  const targetId = rows[0].category_name;
  return targetId;
};

exports.editCategory = async (categoryId, newName) => {
  console.log(`query editCategory triggered`);
  const sql = `update categories set category_name = '${newName}' where category_id = ${categoryId}`;
  const response = await pool.query(sql);
  return response;
};




exports.deleteCategory = async (categoryId) => {
  console.log(`query deleteCategory triggered`);
  const sql = `delete from categories where category_id = ${categoryId};`;
  const response = await pool.query(sql);
  return response;

}