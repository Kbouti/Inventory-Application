const pool = require("../pool");

const partsTagsQueries = require("../queries/partsTagsQueries");

// We need to make part names unique for this to work
exports.findPartId = async (partName) => {
  console.log(`query findPartId triggered`);
  const idQuery = `select part_id from parts where part_name = '${partName}';`;
  const { rows } = await pool.query(idQuery);
  const targetId = rows[0].part_id;
  return targetId;
};

exports.newPart = async (name, category, quantity, description) => {
  console.log(`query newPart triggered`);

  const sql = `insert into parts (part_name, category, quantity, description) values ('${name}', ${category}, ${quantity}, '${description}');`;
  const response = await pool.query(sql);
  const partId = await this.findPartId(name);
  return partId;
};

exports.getAllParts = async () => {
  console.log(`query getAllParts triggered`);

  // const sql = `select * from parts;`
  // Below will return all parts and their attributes, with the category name instead of category id
  const sql = `select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category;`;
  const { rows } = await pool.query(sql);
  return rows;
};

exports.getPartsByCategoryId = async (category_id) => {
  console.log(`query getPartsByCategoryId triggered`);
// ************************************************************************************
// We need to fix this so that category name is returned as well as just part details, like the query above. 
// ************************************************************************************
const sql = `select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category where category=${category_id};`;
// const sql = `select * from parts where category=${category_id};`;
  const { rows } = await pool.query(sql);
  return rows;
};

exports.getPartsById = async (part_id) => {
  console.log(`query getPartsById triggered`);

  console.log(`getting part by id: ${part_id}`);
  if (part_id.length == 0) {
    return null;
  }
  if (part_id.length == 1) {
    console.log(`part_id.length = 1. part_id: ${part_id}`);
    const sql = `select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category where parts.part_id in (${part_id});`;
    const { rows } = await pool.query(sql);
    return rows;
  } else {
    console.log(`multiple id's detected, creating complex string. `);
    let arrayString = "";
    for (let i = 0; i < part_id.length; i++) {
      if (i == 0) {
        arrayString += part_id[i];
      } else {
        arrayString += `, ${part_id[i]}`;
      }
      console.log(`arrayString: ${arrayString}`);
    }
    const sql = `select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category where parts.part_id in (${arrayString});`;
    // console.log(`sql: ${sql}`);
    const { rows } = await pool.query(sql);
    return rows;
  }
};

exports.getPartIds = async (tagId) => {
  console.log(`query getPartIds triggered`);

  console.log(`fetching partIds for tagId: ${tagId}`);
  const sql = `select * from partstags where tag=${tagId};`;
  const { rows } = await pool.query(sql);
  // Now we have a table of rows containing: partstagsid, part, and tag.
  console.log(`obtained relavant parts ids`);
  let partIds = [];
  rows.forEach((row) => {
    partIds.push(row.part);
  });
  console.log(`partIds: ${partIds}`);
  return partIds;
};

exports.deletePart = async (part_id) => {
  console.log(`query deletePart triggered`);

  console.log(`deleteing part where part_id: ${part_id}`);
  const sql = `delete from parts where part_id = ${part_id};`;
  const response = await pool.query(sql);
  return response;
};

exports.editPartDetails = async (partId, newDetails) => {
  console.log(`query editPartDetails triggered`);

  const updatePartSql = `update parts set part_name='${newDetails.newName}', category=${newDetails.newCategory}, quantity =${newDetails.newQuantity}, description='${newDetails.newDescription}' where part_id=${partId};`;
  console.log(`updatePartSql: ${updatePartSql}`);
  const response = await pool.query(updatePartSql);
  return response;
};

exports.deletePartsByCategory = async (categoryId) => {
  console.log(`query deletePartsByCategory triggered`);

  // First we need to remove all partstags references where a part is in our category.
  // That could be easier said than done...... Or rather, done in more than one ways..
  const partsSql = `select * from parts where category = ${categoryId};`;
  console.log(`partsSql: ${partsSql}`);
  const parts  = await pool.query(partsSql);
const rows = parts.rows;




  // console.log(`parts.length: ${parts.length}`);
console.log(`JSON.stringify(parts): ${JSON.stringify(parts)})`)
  // parts.forEach((part) => {
  //   console.log(`part: ${JSON.stringify(part)}`);
  // });

  console.log(`JSON.stringify(rows): ${JSON.stringify(rows)})`)


  let partIds = "";
  if (rows.length > 0) {
    for (let i = 0; i < rows.length; i++) {
      if (i == 0) {
        partIds += rows[i].part_id;
      } else {
        partIds += `, ${rows[i].part_id}`;
      }
    }

    const partsTagsSql = `delete from partstags where part in (${partIds});`;
    const response1 = await pool.query(partsTagsSql);
    console.log(`deleted partstags relations for partIds: ${partIds}`);

    const partsSql = `delete from parts where category = ${categoryId};`;
    console.log(`deleted parts where categoryId: ${categoryId}`);

    const response2 = await pool.query(partsSql);
  }

  return;
};
