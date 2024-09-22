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
    const idQuery = `select * from tags where tag_name = '${tagName}';`;
    console.log(`idQuery: ${idQuery}`);
    const { rows } = await pool.query(idQuery);
    const targetId = rows[0].tag_id;
    console.log(`targetTagId: ${targetId}`);
    return targetId;
  };


  // Need find name by Id

  exports.findTagName = async (tag_id) => {
    console.log(`query findTagName triggered`);

    const nameQuery = `select * from tags where tag_id = '${tag_id}';`;
    console.log(`nameQuery: ${nameQuery}`);
    const { rows } = await pool.query(nameQuery);
    const targetName = rows[0].tag_name;
    console.log(`targetName: ${targetName}`);
    return targetName;
  }


  exports.editTagName = async (tagId, newName) => {
    console.log(`query editTagName triggered`);
    const updateTagSql = `update tags set tag_name='${newName}' where tag_id='${tagId}';`;
    const response = await pool.query(updateTagSql);
    return response;
  }