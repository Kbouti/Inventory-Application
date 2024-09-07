const queries = require("../database/queries");

async function getCategories () {
    const categories = await queries.getAllCategories();
    return categories;
}

async function getTags () {
    const tags = await queries.getAllTags();
    return tags;
}


module.exports = {
    getCategories, getTags
}