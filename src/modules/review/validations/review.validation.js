

import Joi from "joi";

export const addReviewShema=Joi.object({

    text:Joi.string().min(3).max(10000).required(),
    product:Joi.string().hex().length(24).required(),
    rating:Joi.number().min(1).max(5).required() 
 
      
})
export const updateReviewSchema=Joi.object({
    id: Joi.string().hex().length(24).required(),

    text:Joi.string().min(3).max(10000),
    product:Joi.string().hex().length(24),
    rating:Joi.number().min(1).max(5)
 
})
export const getReviewByIDSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });
  
  export const deleteReviewSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });
  
