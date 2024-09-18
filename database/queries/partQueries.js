const pool = require("../pool");

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

  exports.getAllParts = async () => {
    // const sql = `select * from parts;`
    // Below will return all parts and their attributes, with the category name instead of category id
    const sql = `select parts.part_id, parts.part_name, categories.category_name, parts.quantity, parts.description from categories inner join parts on categories.category_id = parts.category;`;
    const { rows } = await pool.query(sql);
    return rows;
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
    console.log(`deleteing part where part_id: ${part_id}`);
    const sql = `delete from parts where part_id = ${part_id};`;
    const response = await pool.query(sql);
    return response;
  }