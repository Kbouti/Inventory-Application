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

// ************************************************************************************************************
// ************************************************************************************************************

// Perhaps we need to break this into smaaller functions??

// ************************************************************************************************************
// ************************************************************************************************************

async function getPartIds(tagId) {
  console.log(`fetching partIds for tagId: ${tagId}`);
  const sql = `select * from partstags where tag=${tagId};`;
  const { rows } = await pool.query(sql);
  // Now we have a table of rows containing: partstagsid, part, and tag.

  console.log(`obtained relavant parts ids`);
  let partIds = [];
  rows.forEach((row) => {
    partIds.push(row.part);
  });
  return partIds;
}

function createPartArrayString(partIds) {
  let arrayString = "";
  if (partIds.length > 0) {
    console.log(`partsId.length is greater than zero`);
    for (let i = 0; i < partIds.length; i++) {
      if (i == 0) {
        arrayString += partIds[i];
      } else {
        arrayString += `, ${partIds[i]}`;
      }
    }
    return arrayString;
  } else if (partIds.length == 0) {
    console.log(`partsId.length equal to zero`);
    console.log(`returning null`);
    return null;
  }
  console.log(`arrayString: ${arrayString}`);
}

exports.getPartsByTagId = async (tagId) => {



  const partIds = await getPartIds(tagId);
  console.log(`partIds: ${partIds}`);
  const arrayString = createPartArrayString(partIds);
  console.log(`arrayString: ${arrayString}`);

  if (arrayString == null) {
    console.log(`array string ${arrayString} is null`);
    console.log(`returning null`);
    return null;
  }

  const partsRequest =
    "select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category where part_id in (" + arrayString + ");";
  console.log(`partsRequest: ${partsRequest}`);
  // This seems like a good request...
  // ************************************************************************************************************

  // const hardCode = 'select * from parts where part_id in (1, 2);'
  // const hardCode = 'select * from parts;'
  // const { partRows } = await pool.query(hardCode);
  // Even when I try these queries it's getting undefined. SO there's definitely something fishy going on.

  // I saw to try this on stack overflow
// const client = await pool.connect();
// const { partRows } = await client.query(partsRequest);

  const { partRows } = await pool.query(partsRequest);
  // This SHOULD be the rows we want
  console.log(`obtained partRows: ${partRows}`);
  // ^^ This is undefined.
  // WHY IS THIS UNDEFINED??????

  // This is not returning what we want. Why not??
  // It works in psql

  return partRows;
};

// Starting this function over:
exports.getSpecificParts = async (tagId) => {
  const sql = `select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category where parts.part_id in (1, 6);`;
  const { rows } = await pool.query(sql);
  return rows;

}