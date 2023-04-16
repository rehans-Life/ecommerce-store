import connectDb from "../../middleware/mongoose";
import User from "../../modals/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);
    const user = await User.findOne({ email: email });
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const userPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (password === userPassword) {
        const token = jwt.sign(
          { username: user.username, email: user.email },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
        res.status(200).json({
          success: true,
          message: "Your Account has been Successfully Logged In",
          token,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Invalid Credentials",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "A User Doesnt Exist With the Given Email",
      });
    }
  } else {
    res.status(200).json({ success: false,message:'Invalid Method' });
  }
}

export default connectDb(handler);
