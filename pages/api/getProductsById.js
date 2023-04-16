// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import Product from "../../modals/Product";

async function handler(req, res) {
  if (req.method === "POST") {
    const id = JSON.parse(req.body).id;
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  }
}
export default connectDb(handler);
