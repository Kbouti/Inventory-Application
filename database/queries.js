const pool = require("./pool");

async function getAllCategories() {
    const {rows} = await pool.query("select * from categories;")
return rows;
}

async function getAllTags() {
    const {rows} = await pool.query("select * from tags;")
return rows;
}


module.exports = {
    getAllCategories, getAllTags
}