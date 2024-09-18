const pool = require("../pool");

exports.getAllCategories = async () => {
    const { rows } = await pool.query(
      "select * from categories order by category_name;"
    );
    return rows;
  };

  exports.newCategory = async (name) => {
    const sql = `insert into categories (category_name) values ('${name}');`;
    const response = await pool.query(sql);
    return response;
  };

  exports.findCategoryId = async (categoryName) => {
    const idQuery = `select category_id from categories where category_name = '${categoryName}';`;
    const { rows } = await pool.query(idQuery);
    const targetId = rows[0].category_id;
    return targetId;
  };