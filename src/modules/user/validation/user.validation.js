import Joi from "joi";



export const useridSchema=Joi.object({
    id:Joi.string().hex().length(24).required(),

})

export const updateUserSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    name: Joi.string().min(3).max(500).trim(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().trim().min(6), // Adjust min length as per your requirement
    role: Joi.string().valid('User', 'Admin').default('User'),
    blocked: Joi.boolean().default(false),
    phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/) // Allow phone numbers between 10 to 15 digits
    ,
  });