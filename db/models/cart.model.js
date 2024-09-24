import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
        },
      },
    ],
    totalPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
