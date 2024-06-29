const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

// Virtual schema for URL?

// Export model
module.exports = mongoose.model("Category", CategorySchema);
