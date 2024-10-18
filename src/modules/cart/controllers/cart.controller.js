import CartModel from "../../../../db/models/cart.model.js";
import couponModel from "../../../../db/models/coupon.model.js";
import productModel from "../../../../db/models/product.model.js";
import { AppError } from "../../../../utils/AppError.js";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne, getitembyid } from "../../handlers/apihandlers.js";

// Function to calculate total price
function calcPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalPrice = totalPrice;

  // Calculate the price after discount if discount is provided
  if (cart.discount) {
    cart.totalPriceAfterDiscount =
      totalPrice - (totalPrice * cart.discount) / 100;
  }
}

export const addCartWithUpdate = handleError(async (req, res, next) => {
  // Extract product IDs from cartItems
  const productIds = req.body.cartItems.map((item) => item.product);

  // Fetch all products in one query and select only the price and _id
  const products = await productModel
    .find({ _id: { $in: productIds } })
    .select("price _id");

  // Check if all products exist in the database
  const productMap = products.reduce((acc, product) => {
    acc[product._id] = product.price;
    return acc;
  }, {});

  // Check for missing products before proceeding
  const missingProducts = req.body.cartItems.filter(
    (item) => !productMap[item.product]
  );

  if (missingProducts.length > 0) {
    return next( new AppError( `Product(s) not found: ${missingProducts  .map((item) => item.product)  .join(", ")}`,  404 ));
  }

  // Assign prices to each item in cartItems
  req.body.cartItems.forEach((item) => {
    item.price = productMap[item.product];
  });

  // Check if the cart already exists for the user
  let cart = await CartModel.findOne({ createdby: req.user._id });

  if (!cart) {
    // Create a new cart if none exists
    cart = new CartModel({
      createdby: req.user._id,
      cartItems: req.body.cartItems,
      discount: req.body.discount || 0, // Store discount from request body (if exists)
    });
    calcPrice(cart);

    // Ensure totalPrice is a valid number before saving
    if (isNaN(cart.totalPrice) || cart.totalPrice <= 0) {
      return next(
        new AppError("Invalid total price. Please check your cart items.", 400)
      );
    }
    await cart.save();
    return res.status(201).json({ message: "Cart created successfully", cart });
  }

  // If the cart already exists, update the cart
  req.body.cartItems.forEach((item) => {
    let existingItem = cart.cartItems.find(
      (cartItem) => cartItem.product.toString() === item.product.toString()
    );
    if (existingItem) {
      existingItem.quantity += 1; // Automatically increase quantity by 1 for existing items
    } else {
      cart.cartItems.push(item); // Add new product to the cart
    }
  });

  // Update discount if it's passed in the request body
  if (req.body.discount !== undefined) {
    cart.discount = req.body.discount;
  }

  // Recalculate total price for the updated cart
  calcPrice(cart);

  // Ensure totalPrice is a valid number before saving
  if (isNaN(cart.totalPrice) || cart.totalPrice <= 0) {
    return next(
      new AppError("Invalid total price. Please check your cart items.", 400)
    );
  }

  // Save the updated cart to the database
  await cart.save();
  res.json({ message: "Cart updated successfully", cart });
});

export const getcart = handleError(async (req, res, next) => {
  let cart = await CartModel.findOne({ createdby: req.user._id });
  res.json({ message: "Dona Get Cart", cart });
});

export const removeCartItem = handleError(async (req, res, next) => {
  // Find the cart
  let cart = await CartModel.findOne({ createdby: req.user._id });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  // Check if the item exists in cartItems
  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.id
  );

  if (itemIndex === -1) {
    return next(new AppError("Item not found in the cart", 404)); // Item doesn't exist in the cart
  }

  // If the item exists, remove it
  cart.cartItems.splice(itemIndex, 1); // Remove item from the cart

  // Recalculate the price after removing the item
  calcPrice(cart);

  // Save the updated cart
  await cart.save();

  // Respond with the updated cart
  res.json({ message: "Item removed successfully", cart });
});

export const getcartById = getitembyid(CartModel);

export const applyCoupon = handleError(async (req, res, next) => {
  const code = await couponModel.findOne({ code: req.params.code });

  if (!code) {
    return next(new AppError("Invalid coupon code", 404));
  }

  if (code.expiryDate && new Date(code.expiryDate) < new Date()) {
    return next(new AppError("Coupon has expired", 400));
  }

  const cart = await CartModel.findOne({ createdby: req.user._id });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const discountAmount = (cart.totalPrice * code.discount) / 100;
  cart.totalPriceAfterDiscount = cart.totalPrice - discountAmount;

  if (cart.totalPriceAfterDiscount < 0) {
    return next(new AppError("Discount exceeds total price", 400));
  }

  cart.discount = code.discount;
  await cart.save();

  res.json({ message: "Coupon applied successfully", cart });
});

export const deletecart = deleteOne(CartModel);
