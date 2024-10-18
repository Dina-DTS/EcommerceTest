import Joi from "joi";



export const addcartSchema = Joi.object({
    cartItems: Joi.array().items(
      Joi.object({
        product: Joi.string().hex().length(24).required(),  // Valid MongoDB ObjectId for product
        quantity: Joi.number().integer().min(1).max(100).optional(),  // Quantity between 1 and 100
        // price field is removed here as it will be fetched in the controller
      })
    ).min(1).required(),  // Ensure at least one item in the cart
    discount: Joi.number().min(0).max(100).optional(),  // Optional discount percentage (0 to 100)
  });

  
  export const removeCartItemSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
})