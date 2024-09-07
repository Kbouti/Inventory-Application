const pool = require("./pool");

async function getAllCategories() {
    const {rows} = await pool.query("select * from categories;")
return rows;
}


module.exports = {
    getAllCategories
}