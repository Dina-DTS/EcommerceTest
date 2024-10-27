import Joi from 'joi';

// Define your validation schema for the address
export const addressSchema = Joi.object({
    city: Joi.string().required().messages({
        'string.empty': '"City" is required',
    }),
    street: Joi.string().required().messages({
        'string.empty': '"Street" is required',
    }),
});
export const removeaddressSchema = Joi.object({
    addressId:Joi.string().hex().length(24).required(),
});