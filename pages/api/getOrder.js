// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "../../modals/Order";
import connectDb from "../../middleware/mongoose";
async function handler(req, res) {
  if (req.method === "POST") {
    const { orderId } = JSON.parse(req.body);
    const orderDetails = await Order.findOne({ orderId: orderId });
    res.status(200).json(orderDetails);
  } else {
    res.status(200).json({ success: false, message: "Invalid Method" });
  }
}
export default connectDb(handler);
