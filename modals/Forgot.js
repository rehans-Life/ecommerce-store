const mongoose = require("mongoose");

const ForgotSchema = new mongoose.Schema(
  {
    email: { type: String, reuqired: true },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Forgot || mongoose.model("Forgot", ForgotSchema);
