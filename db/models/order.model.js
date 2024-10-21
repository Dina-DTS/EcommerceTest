import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    createdby: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
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
    totalOrderPrice: Number,
    discount: Number,
    totalAfterDiscount: Number,
    paymentMethod: {
      type: String,
      enums: ["cache", "credit"],
      default: "cache",
    },
    shippingAddress: {
      city: String,
      street: String,
  },

    isPaid: Boolean,
    paidAt: Date,
    isDelevired: Boolean,
  },
  { timestamps: true }
);
// Pre middleware to populate the product inside cartItems for any find operation
orderSchema.pre(/^find/, function () {
  this.populate({
    path: 'cartItems.product',
    model: 'Product',
  });
});
const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
