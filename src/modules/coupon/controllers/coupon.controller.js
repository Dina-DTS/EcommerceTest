import couponModel from "../../../../db/models/coupon.model.js";

import { AppError } from "../../../../utils/AppError.js";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne,getAllItems,getitembyid } from "../../handlers/apihandlers.js";
import QRCode from 'qrcode'



export const addcoupon = handleError(async (req, res,next) => {

    const precoupon= new couponModel(req.body);
    let addcoupon = await precoupon.save();
    res.json({ message: "Added Coupon", addcoupon });
  });
  
  
  export const getAllcoupons = getAllItems(couponModel)
  
  export const getcouponById = getitembyid(couponModel)
  
  export const updatecoupon = handleError(async (req, res,next) => {
     let {id}=req.params
    const updatecoupon = await couponModel.findOneAndUpdate({ _id:id },  req.body , { new: true } );

    updatecoupon && res.json({ message: "Done", updatecoupon });
    !updatecoupon && next(new AppError("Not Found This coupon Which you want updated",404))
  });
  
  export const deletecoupon =deleteOne(couponModel)
  