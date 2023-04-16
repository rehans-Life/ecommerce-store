import connectDb from "../../middleware/mongoose";
import User from "../../modals/User";
async function handler(req, res) {
  const { email } = JSON.parse(req.body);
  const user = await User.findOne({ email: email });
  res.status(200).json(user);
}

export default connectDb(handler);
