const queries = require("../database/queries");

async function getCategories () {
    const categories = await queries.getAllCategories();
    console.log("success!");
    categories.forEach((category) => console.log(category.name));
    return;
}


module.exports = {
    getCategories
}