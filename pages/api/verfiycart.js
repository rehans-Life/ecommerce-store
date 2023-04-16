// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Product from "../../modals/Product";

async function handler(req, res) {
  if (req.method === "POST") {
    const basket = JSON.parse(req.body);
    for (let i = 0; i < basket.length; i++) {
      const item = basket[i];
      const itemDb = await Product.findOne({ _id: item.id });
      if (item.price * item.quantity !== itemDb.price * item.quantity) {
        res.status(200).json({
          success: false,
          message: "Some items in your cart have Invalid Amounts",
        });
        return;
      }
      if (itemDb.availableQty < item.quantity) {
        res.status(200).json({
          success: false,
          message:
            "We dont have enough stock for some of the items that you ordered please reduce their quantity",
        });
        return;
      }
    }
    res.status(200).json({ success: true, message: "Show Paypal" });
  } else {
    res.status(200).json({ success: false, message: "Invalid Method" });
  }
}
export default connectDb(handler);
