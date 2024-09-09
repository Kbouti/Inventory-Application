const pool = require("./pool");

async function getAllCategories() {
    const {rows} = await pool.query("select * from categories;")
return rows;
}

async function getAllTags() {
    const {rows} = await pool.query("select * from tags;")
return rows;
}


async function newCategory(name) {

    const sql = `insert into categories (name) values ('${name}');`;
    const response = await pool.query(sql);
    return response
}



module.exports = {
    getAllCategories, getAllTags, newCategory
}