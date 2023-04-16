// getting-started.js
const mongoose = require("mongoose");

// Schema for the documents that are going to be inside
// of my orders collectiom

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    products: [
      {
        id: { type: String },
        slug: { type: String },
        quantity: { type: Number, default: 1 },
        size: { type: String },
        color: { type: String },
        title: { type: String },
        images: { type: Array },
        price: { type: String },
        category: { type: String },
      },
    ],
    address: { type: Object, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, default: "Initialized", required: true },
    deliveryStatus: { type: String, default: "Not Delivered", required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
