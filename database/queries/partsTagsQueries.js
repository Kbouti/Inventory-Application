const pool = require("../pool");

exports.newPartTag = async (part, tag) => {
    const sql = `insert into partstags (part, tag) values ('${part}','${tag}');`;
    const response = await pool.query(sql);
    return response;
  };

  exports.getPartTags = async () => {
    // This returns a table which we can use to determine which tags (with names) apply to any given part(just the id at the moment)
    const sql = `select * from partstags inner join tags on tags.tag_id=partstags.tag;`;
    const { rows } = await pool.query(sql);
    return rows;
  };

  exports.deletePartsTags = async (part_id) => {
    console.log(`removing partsTags relation where part_id: ${part_id}`);
    const sql = `delete from partstags where part = ${part_id};`;
    const response = await pool.query(sql);
    return response;
  
  }