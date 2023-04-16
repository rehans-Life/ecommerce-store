import connectDb from "../../middleware/mongoose";
import Forgot from "../../modals/Forgot";
import User from "../../modals/User";
var CryptoJS = require("crypto-js");
async function handler(req, res) {
  const { token, password } = JSON.parse(req.body);
  const entry = await Forgot.findOne({ token: token });
  if (entry) {
    const decryptedNewPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();
    await User.findOneAndUpdate(
      { email: entry.email },
      { password: decryptedNewPassword }
    );
    res.status(200).json({
      success: true,
      message: "Your Password has been Successfully Updated",
    });
  } else {
    res.status(200).json({ success: false, message: "Invalid Token" });
  }
}

export default connectDb(handler);
