const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String},
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true }, // reference to the associated brand
  price: { type: Number, required: true, min: 0.01},
  quantity: { type: Number, required: true },
  suppliers: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  imageUrl: { type: String, required: true },

});

// Virtual schema for URL
PartSchema.virtual("url").get(function () {
    return `/catalog/part/${this._id}`;
});

// Export model
module.exports = mongoose.model("Part", PartSchema);
