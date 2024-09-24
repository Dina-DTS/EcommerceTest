import CartModel from "../../../../db/models/cart.model.js";
import couponModel from "../../../../db/models/coupon.model.js";
import productModel from "../../../../db/models/product.model.js";
import { AppError } from "../../../../utils/AppError.js";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne, getitembyid } from "../../handlers/apihandlers.js";

function calcPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.quantity * ele.price;
  });
  cart.totalPrice = totalPrice;
}

export const addCart = handleError(async (req, res, next) => {
  // here i take product from body i want select the price of this product to add it in boy
  let product = await productModel.findById(req.body.product).select("price");
  !product && next(new AppError("Product Not Found", 404));
  req.body.price = product.price;
  //  here i want check if the cart exit already or not so if the user have cart i dont make another one add immediatly
  let iscart = await CartModel.findOne({ createdby: req.user._id });
  if (!iscart) {
    let cart = new CartModel({
      createdby: req.user._id,
      cartItems: [req.body],
    });
    calcPrice(cart);
    await cart.save();
    return res.status(201).json({ message: "Done Added Cart", cart });
  }
  //  here alrady have cart so find ele ele to increase quantity
  let item = iscart.cartItems.find((ele) => ele.product == req.body.product);
  if (item) {
    item.quantity += 1;
  } else {
    iscart.cartItems.push(req.body);
  }
  calcPrice(iscart);
  if (iscart.discount)
    iscart.totalPriceAfterDiscount =
      iscart.totalPrice - (iscart.totalPrice * iscart.discount) / 100;

  await iscart.save();
  res.json({ message: "Addedcsuccess", iscart });
});

export const getcart = handleError(async (req, res, next) => {
  let cart = await CartModel.findOne({ createdby: req.user._id });
  res.json({ message: "Dona Get Cart", cart });
});

export const removeCartItem = handleError(async (req, res, next) => {
  let cart = await CartModel.findOneAndUpdate(
    { createdby: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  console.log(cart);
  calcPrice(cart);

  res.json({ message: "Remove Item Successfully", cart });
});

export const getcartById = getitembyid(CartModel);

export const updatecart = handleError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product).select("price");
  !product && next(new AppError("Product Not Found", 404));
  req.body.price = product.price;
  //  here i want check if the cart exit already or not so if the user have cart i dont make another one add immediatly
  let iscart = await CartModel.findOne({ createdby: req.user._id });
  //  here alrady have cart so find ele ele to increase quantity
  let item = iscart.cartItems.find((ele) => ele.product == req.body.product);
  if (!item) {
    return next(new AppError("Not Found this cart", 404));
  }
  item.quantity = req.body.quantity;
  calcPrice(iscart);
  await iscart.save();
  res.json({ message: "Addedcsuccess", iscart });
});

export const applyCoupon=handleError(async(req,res,next)=>{
  let code= await couponModel.findOne({code:req.params.code});
  console.log(code)
  let cart=await CartModel.findOne({createdby:req.user._id});
  cart.totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice *code.discount) /100 ;
  cart.discount=code.discount;
  await cart.save()
  res.json({message:"Done",cart})
})

export const deletecart = deleteOne(CartModel);
