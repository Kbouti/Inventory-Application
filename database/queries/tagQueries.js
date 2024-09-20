const pool = require("../pool");

exports.getAllTags = async () => {
  console.log(`query getAllTags triggered`);

    const { rows } = await pool.query("select * from tags order by tag_name;");
    return rows;
  };
  

  exports.newTag = async (name) => {
    console.log(`query newTag triggered`);

    const sql = `insert into tags (tag_name) values ('${name}');`;
    const response = await pool.query(sql);
    return response;
  };

  exports.findTagId = async (tagName) => {
    console.log(`query findTagId triggered`);

    console.log(`findTagId query activated`);
    const idQuery = `select * from tags where tag_name = '${tagName}';`;
    console.log(`idQuery: ${idQuery}`);
    const { rows } = await pool.query(idQuery);
    const targetId = rows[0].tag_id;
    console.log(`targetTagId: ${targetId}`);
    return targetId;
  };