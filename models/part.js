const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true }, // reference to the associated brand
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  supplier: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],required: false,

  // Supplier?
});

// Virtual schema for URL?

// Export model
module.exports = mongoose.model("Part", PartSchema);
