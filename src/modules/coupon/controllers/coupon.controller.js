import couponModel from "../../../../db/models/coupon.model.js";

import { AppError } from "../../../../utils/AppError.js";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne,getAllItems,getitembyid } from "../../handlers/apihandlers.js";
import QRCode from 'qrcode'



export const addcoupon = handleError(async (req, res, next) => {
  // Check if the coupon code already exists
  const existingCoupon = await couponModel.findOne({ code: req.body.code });
  if (existingCoupon) {
    return next(new AppError("Coupon code already exists", 400));
  }
  req.body.createdby=req.user._id
  // Save the new coupon
  const newCoupon = new couponModel(req.body);
  const addedCoupon = await newCoupon.save();

  res.status(201).json({ message: "Added Coupon", addedCoupon });
});
  
  export const getAllcoupons = getAllItems(couponModel)
  
  export const getcouponById = getitembyid(couponModel)
  
  export const updatecoupon = handleError(async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
  
    const errors = [];
  
    // 1. Check if no fields were provided for update
    if (Object.keys(updates).length === 0) {
      return next(new AppError("No update Fields provided", 400)); // Exit early if no fields are provided
    }
  
    // 2. Find the existing coupon
    const existingCoupon = await couponModel.findById(id);
    if (!existingCoupon) {
      errors.push("Coupon not found.");
    }
  
    // 3. Compare the new data with the existing data
    if (existingCoupon) {
      const isSameData = Object.keys(updates).every(
        (key) => updates[key] === existingCoupon[key]
      );
  
      if (isSameData) {
        errors.push("No changes detected. You must modify the data to update.");
      }
    }
  
    // 4. If there are any validation errors, return all at once
    if (errors.length > 0) {
      return next(new AppError(errors.join(" "), 400)); // Combine errors into one string and pass to the AppError
    }
  
    // 5. Set the user making the update
    updates.updatedBy = req.user._id;
  
    // 6. Update only the fields that are provided in the request
    const updatedCoupon = await couponModel.findByIdAndUpdate(id, updates, { new: true });
  
    // 7. Return the updated coupon
    res.json({ message: "Coupon updated successfully", updatedCoupon });
  });
  
  
  
  export const deletecoupon =deleteOne(couponModel)
  