const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  supplier: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],required: false,
  // Supplier(s)?
});

// Virtual schema for URL?

// Export model
module.exports = mongoose.model("Brand", BrandSchema);
