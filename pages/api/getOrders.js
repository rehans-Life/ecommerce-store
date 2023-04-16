// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Order from "../../modals/Order";
async function handler(req, res) {
  if (req.method === "POST") {
    const { email, all } = JSON.parse(req.body);
    let orders = [];
    if (all) {
      orders = await Order.find();
    } else {
      orders = await Order.find({ email: email });
    }
    res.status(200).json(orders);
  } else {
    res.status(200).json({ success: false, message: "Invalid Method" });
  }
}
export default connectDb(handler);
