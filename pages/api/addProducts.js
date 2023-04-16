// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../middleware/mongoose";
import Product from "../../modals/Product";

async function handler(req, res) {
  if (req.method === "POST") {
    const product = JSON.parse(req.body);
    const newProduct = new Product({
      ...product,
    });
    newProduct
      .save()
      .then(() => res.status(200).json({ success: true }))
      .catch((error) =>
        res.status(200).json({ success: false, message: error.message })
      );
  }
}

export default connectDb(handler);
