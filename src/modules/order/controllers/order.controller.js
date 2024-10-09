import CartModel from "../../../../db/models/cart.model.js";
import orderModel from "../../../../db/models/order.model.js";
import productModel from "../../../../db/models/product.model.js";
import userModel from "../../../../db/models/user.model.js";

import { AppError } from "../../../../utils/AppError.js";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne, getAllItems, getitembyid } from "../../handlers/apihandlers.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OnNMxDuWEVNKbHFsQODM66IZm1OxHxCNQAoIKbBqgubHplCKoRbdNEJdIswhJ3gCHwgoOUajYNNnFTmw1w0kXmf00WGWaMWBx');




export const addOrder = handleError(async (req, res, next) => {
  let cart=await CartModel.findById(req.params.id)
  if (!cart) {
    return next (new AppError("No cart to order",404))
  }

  let totalOrderPrice=cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice;
  let order=new orderModel({
    createdby:req.user._id,
    cartItems:cart.cartItems,
    totalOrderPrice,
    shippingAddress:req.body.shippingAddress
  })
//   update sold and qunatity bulikwrite
  if(order){
    let options=cart.cartItems.map(item=>({
        updateOne:{
            filter:{_id:item.product},
            update:{$inc:{quantity:-item.quantity,sold:item.quantity}},

        }

    }));
    await productModel.bulkWrite(options)
    await order.save()
  }else{
    return next(new AppError("error occurs",409))
  }
//   remove cart
await CartModel.findByIdAndDelete(req.params.id)
res.json({message:"Done",order})
});
export const getAllOrders = getAllItems(orderModel)

export const getorderById = getitembyid(orderModel);


//for user making
export const getorder =handleError(async(req,res,next)=>{
    let order = await orderModel.findOne({ createdby: req.user._id })
    console.log(order)
    res.json({message:"Done",order})
})

// export const updateorder = handleError(async (req, res, next) => {
 
// });


// export const deleteorder = deleteOne(CartModel);


export const onlinePayment=handleError(async(req,res,next)=>{

  let cart=await CartModel.findById(req.params.id)
  let totalOrderPrice=cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice;


  let session= await stripe.checkout.sessions.create({
    line_items:[
      {
        price_data:{
          currency:"egp",
          unit_amount:totalOrderPrice*100, //00.123=>123.00
          product_data:{
            name:req.user.name,
          },

        },
        quantity:1,

      },
    ],
    mode:"payment",
    success_url:"https://route-comm.netlify.app/#/",
    cancel_url:"https://route-comm.netlify.app/#/cart",
    customer_email:req.user.email,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress

  });
  res.json({message:"Done ya basha",session})
})

export const createOnlinePayment=handleError(async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    throw new AppError("Missing Stripe signature", 400); // Let handleError catch this error
  }

  // This will throw an error if the signature verification fails, 
  // which will be caught by handleError middleware.
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig.toString(),
    "whsec_ip0MTEI5JmPQiC8RmXbvYvZ8VaeTcRXP"
  );
   let checkoutSessionCompleted
  if (event.type == "checkout.session.completed") {
     checkoutSessionCompleted = event.data.object;

    let user = await userModel.findOne({ email: checkoutSessionCompleted.customer_email });
    let cart = await CartModel.findById(checkoutSessionCompleted.client_reference_id);

    if (!cart) {
      throw new AppError("No cart to order", 404); // Let handleError catch this error
    }

    // Create order
    let order = new orderModel({
      createdby: user._id,
      cartItems: cart.cartItems,
      totalOrderPrice: checkoutSessionCompleted.amount_total / 100,
      shippingAddress: checkoutSessionCompleted.metadata,
      paymentMethod: 'credit',
      isPaid: true
    });

    // Update sold and quantity using bulkWrite
    if (order) {
      let options = cart.cartItems.map((item) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
        },
      }));
      await productModel.bulkWrite(options);
      await order.save();
    } else {
      throw new AppError("Error occurred while saving order", 409); // Let handleError catch this error
    }

    // Remove cart
    await CartModel.findByIdAndDelete(checkoutSessionCompleted.client_reference_id);
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ message: "success", checkoutSessionCompleted });
})





