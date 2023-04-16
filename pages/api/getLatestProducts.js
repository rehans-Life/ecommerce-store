import connectDb from "../../middleware/mongoose";
import Product from "../../modals/Product";

async function handler(req, res) {
  const latestProducts = await Product.find().limit(6).sort({ _id: -1 });
  res.status(200).json({ latestProducts });
}

export default connectDb(handler);
