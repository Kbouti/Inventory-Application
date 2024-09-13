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

exports.findCategoryId = async (categoryName) => {
  const idQuery = `select category_id from categories where category_name = '${categoryName}';`;
  const { rows } = await pool.query(idQuery);
  const targetId = rows[0].category_id;
  return targetId;
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
  const sql = `select * from partstags inner join tags on tags.tag_id=partstags.tag;`
  const { rows } = await pool.query(sql);
  return rows;
}

exports.getPartsByCategoryId = async (category_id) => {
  console.log(`fetching parts by categoryId`);

  const sql = `select * from parts where category=${category_id};`;
  const { rows } = await pool.query(sql);
  return rows;
}






// select tag_name from tags inner join partsTags on tags.tag_id = partsTags.tag where partstags.part = 3;

// select * from partstags inner join tags on tags.tag_id=partstags.tag;
// We'd need to add an extra join with parts to get the part name in there^^