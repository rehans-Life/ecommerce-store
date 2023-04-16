import connectDb from "../../middleware/mongoose";
import User from "../../modals/User";
var CryptoJS = require("crypto-js");

async function handler(req, res) {
  const {
    updateUserDetails,
    updateAddressDetails,
    updatePassword,
    password,
    phone,
    username,
    state,
    city,
    district,
    pincode,
    email,
    address2,
    address1,
  } = JSON.parse(req.body);
  if (updateUserDetails) {
    await User.findOneAndUpdate(
      { email: email },
      { phone: phone, username: username }
    )
      .then(() => {
        res.status(200).json({
          success: true,
          message: "User Details Updated Successfully",
        });
      })
      .catch((error) => {
        res.status(200).json({
          success: false,
          message:
            "Some error occured while updating the details please try again later",
        });
      });
  } else if (updateAddressDetails) {
    await User.findOneAndUpdate(
      { email: email },
      {
        state: state,
        city: city,
        district: district,
        pincode: pincode,
        address2: address2,
        address1: address1,
      }
    )
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Address Details Updated Successfully",
        });
      })
      .catch((error) => {
        res.status(200).json({
          success: false,
          message:
            "Some error occured while updating the details please try again",
        });
      });
  } else if (updatePassword) {
    const decryptedNewPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();
    User.findOneAndUpdate(
      { email: email },
      {
        password: decryptedNewPassword,
      }
    )
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Password Updated Successfully",
        });
      })
      .catch((error) => {
        res.status(200).json({
          success: false,
          message:
            "Some error occured while updating the password please try again",
        });
      });
  } else {
    res.status(200).json({
      success: false,
      message: "Invalid Request",
    });
  }
}
export default connectDb(handler);
