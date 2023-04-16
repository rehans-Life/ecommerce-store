const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, reuqired: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    address1: { type: String, default: "" },
    address2: { type: String, default: "" },
    district: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
