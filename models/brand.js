const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  supplier: [{ type: Schema.Types.ObjectId, ref: "Supplier" }]
  // Supplier(s)?
});

// Virtual schema for URL
BrandSchema.virtual("url").get(function () {
    return `/catalog/brand/${this._id}`;
});

// Export model
module.exports = mongoose.model("Brand", BrandSchema);
