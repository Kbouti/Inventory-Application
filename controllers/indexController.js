const queries = require("../database/queries");

async function getCategories () {
    const categories = await queries.getAllCategories();
    return categories;
}


module.exports = {
    getCategories
}