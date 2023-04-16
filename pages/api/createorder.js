import connectDb from "../../middleware/mongoose";
import Order from "../../modals/Order";
import Product from "../../modals/Product";

async function handler(req, res) {
  if (req.method === "POST") {
    const orderDetails = JSON.parse(req.body);
    // Reducing the availbale quantity of products that were ordered
    for (let i = 0; i < orderDetails.products.length; i++) {
      const cartItem = orderDetails.products[i];
      await Product.findOneAndUpdate(
        { _id: cartItem.id },
        {
          $inc: {
            availableQty: -cartItem.quantity,
          },
        }
      );
    }
    const newOrder = new Order(orderDetails);
    newOrder
      .save()
      .then(() => {
        res
          .status(200)
          .json({ success: true, message: "Order Placed Successfully" });
      })
      .catch((error) => {
        res.status(200).json({
          success: false,
          message: error.message,
        });
      });
  } else {
    res.status(200).json({ success: false, message: "Invalid Method" });
  }
}
export default connectDb(handler);
