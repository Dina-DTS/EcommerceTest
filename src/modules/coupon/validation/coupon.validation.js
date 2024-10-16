import Joi from "joi";

// Define the Joi validation schema for a coupon
 export const addcouponSchema = Joi.object({
  code: Joi.string().alphanum().min(3).max(200).required().trim().uppercase(),
  expiry: Joi.date().greater("now").required(),
  discount: Joi.number().min(0).max(100).required(),

});
 export const updatecouponSchema = Joi.object({
  code: Joi.string().alphanum().min(3).max(200).trim().uppercase(),
  expiry: Joi.date().greater("now"),
  discount: Joi.number().min(0).max(100),

});
export const getCouponByIDSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });
  
  export const deleteCouponSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });

// Export the validation function

