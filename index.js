import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connecttodb from "./db/db.connection.js";
import Allrouter from "./routers/v1.routes.js";
import { AppError } from "./utils/AppError.js";
import { createOnlinePayment } from "./src/modules/order/controllers/order.controller.js";
dotenv.config();
const app = express();
const port = +process.env.PORT; // Match the raw body to content type application/json

// app.post(
//   "/api/webhook",
//   express.raw({ type: "application/json" }),
//   handleError(async (req, res, next) => {
//     const sig = req.headers["stripe-signature"];

//     if (!sig) {
//       throw new AppError("Missing Stripe signature", 400); // Let handleError catch this error
//     }

//     // This will throw an error if the signature verification fails, 
//     // which will be caught by handleError middleware.
//     const event = stripe.webhooks.constructEvent(
//       req.body,
//       sig.toString(),
//       "whsec_ip0MTEI5JmPQiC8RmXbvYvZ8VaeTcRXP"
//     );
//      let checkoutSessionCompleted
//     if (event.type == "checkout.session.completed") {
//        checkoutSessionCompleted = event.data.object;

//       let user = await userModel.findOne({ email: checkoutSessionCompleted.customer_email });
//       let cart = await CartModel.findById(checkoutSessionCompleted.client_reference_id);

//       if (!cart) {
//         throw new AppError("No cart to order", 404); // Let handleError catch this error
//       }

//       // Create order
//       let order = new orderModel({
//         createdby: user._id,
//         cartItems: cart.cartItems,
//         totalOrderPrice: checkoutSessionCompleted.amount_total / 100,
//         shippingAddress: checkoutSessionCompleted.metadata,
//         paymentMethod: 'credit',
//         isPaid: true
//       });

//       // Update sold and quantity using bulkWrite
//       if (order) {
//         let options = cart.cartItems.map((item) => ({
//           updateOne: {
//             filter: { _id: item.product },
//             update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
//           },
//         }));
//         await productModel.bulkWrite(options);
//         await order.save();
//       } else {
//         throw new AppError("Error occurred while saving order", 409); // Let handleError catch this error
//       }

//       // Remove cart
//       await CartModel.findByIdAndDelete(checkoutSessionCompleted.client_reference_id);
//     } else {
//       console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a response to acknowledge receipt of the event
//     res.json({ message: "success", checkoutSessionCompleted });
//   })
// );

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  createOnlinePayment
);

app.use(express.json({ limit: "10mb" }));
app.use(cors());


// Increase the limit for URL-encoded payloads
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static("uploads"));

Allrouter(app);

app.use("*", (req, res, next) => {
  next(new AppError("URL Not Found", 404));
});

//hello
//global error to handle handleerror middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message, stack: err.stack });
});
connecttodb();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
