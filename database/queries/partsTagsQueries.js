const pool = require("../pool");

exports.newPartTag = async (part, tag) => {
  console.log(`query newPartTag triggered`);
  const sql = `insert into partstags (part, tag) values ('${part}','${tag}');`;
  const response = await pool.query(sql);
  return response;
};

exports.getPartTags = async () => {
  console.log(`query getPartTags triggered`);
  // This returns a table which we can use to determine which tags (with names) apply to any given part(just the id at the moment)
  const sql = `select * from partstags inner join tags on tags.tag_id=partstags.tag;`;
  const { rows } = await pool.query(sql);
  return rows;
};

exports.deletePartsTags = async (part_id) => {
  console.log(`query deletePartsTags triggered`);
  console.log(`removing partsTags relation where part_id: ${part_id}`);
  const sql = `delete from partstags where part = ${part_id};`;
  const response = await pool.query(sql);
  return response;
};

exports.getTagsByPart = async (part_id) => {
  console.log(`query getTagsByPart triggered`);
  console.log(`getting all tags pertaining to part_id: ${part_id}`);
  const sql = `select tag from partstags where part=${part_id};`;
  const { rows } = await pool.query(sql);
  const tags = [];
  rows.forEach((row) => tags.push(row.tag));
  return tags;
};

exports.deleteTagRelations = async (tag_id) => {
  console.log(`query deleteTagRelations triggered`);
  const deleteSql = `delete from partstags where tag= ${tag_id};`;
  const response = await pool.query(deleteSql);
  return response;
}