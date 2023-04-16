const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    availableQty: { type: Number, required: true },
    price: { type: Number, required: true },
    images: { type: Object, required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    size: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
