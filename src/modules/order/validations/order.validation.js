import Joi from "joi";

// Validation schema for adding an order
export const addOrderValidationSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  shippingAddress: Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
  }).required(),
});
export const validIDSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
})