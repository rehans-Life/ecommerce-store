import connectDb from "../../middleware/mongoose";
import Forgot from "../../modals/Forgot";
import User from "../../modals/User";
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = JSON.parse(req.body);
    const user = await User.findOne({ email: email });
    if (user) {
      const token = uuidv4();
      const mailTransporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: "rehantosif4@gmail.com",
          pass: process.env.PASSWORD,
        },
        secure: true,
      });

      let details = {
        from: "rehantosif4@gmail.com",
        to: email,
        subject: "Password Reset Email From Beechwood Baby",
        html: `<p>Hi ${user.username}, </p>
        <br/>
        <p>There was a request to change your password!</p>
        <br/>
        <p>If you did not make this request then please ignore this email.</p>
        <br/>
        <span>Otherwise, please click this link to change your password:</span> <a href=${`${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}`}>${`${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}`}</a>
        <br/>
        <p>Thank you..</p>`,
      };

      const forgot = new Forgot({
        email,
        token,
      });
      forgot
        .save()
        .then(() => {
          mailTransporter.sendMail(details, (error) => {
            console.log(details);
            if (error) {
              const deleteEntry = async () => {
                await Forgot.deleteOne({ token: token });
              };
              deleteEntry();
              res.status(200).json({
                success: false,
                message:
                  "An error occured while sending the email please try again later",
              });
            } else {
              res.status(200).json({
                success: true,
                message:
                  "Instructions to Reset your Password have been sent to your Email",
              });
            }
          });
        })
        .catch((error) => {
          res.status(200).json({
            success: false,
            message:
              "An error occured while creating an entry to reset your password please try again later",
          });
        });
    } else {
      res.status(200).json({ success: false, message: "User Not Found" });
    }
  } else {
    res.status(200).json({ success: false, message: "Invalid Method" });
  }
}
export default connectDb(handler);
