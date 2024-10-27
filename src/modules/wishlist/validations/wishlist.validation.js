import Joi from 'joi';

// Define your validation schema using hex and length
 export const wishlistSchema = Joi.object({
    product: Joi.string().hex().length(24).required()  // Ensures valid ObjectId format
})


// Define your validation schema using hex and length
 export const addressesSchema = Joi.object({
    city: Joi.string().hex().length(24).required()  // Ensures valid ObjectId format
})