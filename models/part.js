const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PartSchema = new Schema({
  name: { type: String, required: [true, "Name required"] },
  description: { type: String},
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: [true, "Brand is required"] }, // reference to the associated brand
  price: { type: Number, required: true, min: 0.01},
  quantity: { type: Number, required: [true, "Quantity is required"] },
  suppliers: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: [true, "A category is required"] },
  imageUrl: { type: String, required: [true, "Image is required"] },

});

// Virtual schema for URL
PartSchema.virtual("url").get(function () {
    return `/catalog/part/${this._id}`;
});

// Export model
module.exports = mongoose.model("Part", PartSchema);
