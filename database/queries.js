const pool = require("./pool");

exports.getAllCategories = async () => {
  const { rows } = await pool.query(
    "select * from categories order by category_name;"
  );
  return rows;
};

exports.getAllTags = async () => {
  const { rows } = await pool.query("select * from tags order by tag_name;");
  return rows;
};

exports.newCategory = async (name) => {
  const sql = `insert into categories (category_name) values ('${name}');`;
  const response = await pool.query(sql);
  return response;
};

exports.newTag = async (name) => {
  const sql = `insert into tags (tag_name) values ('${name}');`;
  const response = await pool.query(sql);
  return response;
};

// We need to make part names unique for this to work
exports.findPartId = async (partName) => {
  const idQuery = `select part_id from parts where part_name = '${partName}';`;
  const { rows } = await pool.query(idQuery);
  const targetId = rows[0].part_id;
  return targetId;
};

exports.newPart = async (name, category, quantity, description) => {
  const sql = `insert into parts (part_name, category, quantity, description) values ('${name}', ${category}, ${quantity}, '${description}');`;
  const response = await pool.query(sql);
  const partId = await this.findPartId(name);
  return partId;
};

exports.newPartTag = async (part, tag) => {
  const sql = `insert into partstags (part, tag) values ('${part}','${tag}');`;
  const response = await pool.query(sql);
  return response;
};

exports.getAllParts = async () => {
  // const sql = `select * from parts;`
  // Below will return all parts and their attributes, with the category name instead of category id
  const sql = `select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category;`;
  const { rows } = await pool.query(sql);
  return rows;
};

// Now we need a way to get tagnames as well....
// So that will have to be a separate query for each part.

exports.getPartTags = async () => {
  // This returns a table which we can use to determine which tags (with names) apply to any given part(just the id at the moment)
  const sql = `select * from partstags inner join tags on tags.tag_id=partstags.tag;`;
  const { rows } = await pool.query(sql);
  return rows;
};

exports.findCategoryId = async (categoryName) => {
  const idQuery = `select category_id from categories where category_name = '${categoryName}';`;
  const { rows } = await pool.query(idQuery);
  const targetId = rows[0].category_id;
  return targetId;
};

exports.findTagId = async (tagName) => {
  console.log(`findTagId query activated`);
  const idQuery = `select * from tags where tag_name = '${tagName}';`;
  console.log(`idQuery: ${idQuery}`);
  const { rows } = await pool.query(idQuery);
  const targetId = rows[0].tag_id;
  console.log(`targetId: ${targetId}`);
  return targetId;
};

exports.getPartsByCategoryId = async (category_id) => {
  console.log(`fetching parts by categoryId: ${category_id}`);

  const sql = `select * from parts where category=${category_id};`;
  const { rows } = await pool.query(sql);
  return rows;
};


exports.getPartsById = async (part_id) => {
  console.log(`getting part by id: ${part_id}`);
  if (part_id.length == 0) {
    return null;
  }
  if (part_id.length == 1) {
    console.log(`part_id.length = 1. patr_id: ${part_id}`);
    const sql = `select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category where parts.part_id in (${part_id});`;
    const { rows } = await pool.query(sql);
    return rows;
  } else {
    console.log(`multiple id's detected, creating complex string. `);
    let arrayString = "";
    for (let i = 0; i < part_id.length; i++) {
      if (i == 0) {
        arrayString += part_id[i];
        console.log(`arrayString: ${arrayString}`);
      } else {
        arrayString += `, ${part_id[i]}`;
        console.log(`arrayString: ${arrayString}`);
      }
      console.log(`arrayString: ${arrayString}`);
    }
    const sql = `select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category where parts.part_id in (${arrayString});`;
    console.log(`sql: ${sql}`);
    const { rows } = await pool.query(sql);
    return rows;
  }

};


exports.getPartIds = async (tagId) => {
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

