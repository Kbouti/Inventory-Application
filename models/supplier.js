const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  brands: [{ type: Schema.Types.ObjectId, ref: "Brand" }],required: false,
  username: { type: String, required: false },
  password: { type: String, required: false },
});


// Virtual schema for URL
SupplierSchema.virtual("url").get(function () {
    return `/catalog/supplier/${this._id}`;
});


// Export model
module.exports = mongoose.model("Brand", BrandSchema);