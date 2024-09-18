const pool = require("../pool");

exports.getAllTags = async () => {
    const { rows } = await pool.query("select * from tags order by tag_name;");
    return rows;
  };
  

  exports.newTag = async (name) => {
    const sql = `insert into tags (tag_name) values ('${name}');`;
    const response = await pool.query(sql);
    return response;
  };

  exports.findTagId = async (tagName) => {
    console.log(`findTagId query activated`);
    const idQuery = `select * from tags where tag_name = '${tagName}';`;
    console.log(`idQuery: ${idQuery}`);
    const { rows } = await pool.query(idQuery);
    const targetId = rows[0].tag_id;
    console.log(`targetTagId: ${targetId}`);
    return targetId;
  };