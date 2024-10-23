import Joi from 'joi';

 export const signUpValidationSchema = Joi.object({
    name: Joi.string().min(3).max(500).trim().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().trim().min(6).required(), // Adjust min length as per your requirement
    role: Joi.string().valid('User', 'Admin').default('User'),
    blocked: Joi.boolean().default(false),
    phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/) // Allow phone numbers between 10 to 15 digits
    .required(),
  });
  
 export const signInSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().trim().min(6).required(), // Adjust min length as per your requirement
   
  });
  

