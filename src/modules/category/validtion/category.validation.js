import Joi from "joi";

export const addCategoryShema=Joi.object({
    title:Joi.string().min(3).max(200).required(),
    image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg','image/webp').required(),
        destination: Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size: Joi.number().max(5242880).required()
      })
     
      
})

export const getByIDSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
})
export const updatecategorySchema=Joi.object({
    id:Joi.string().hex().length(24).required(),
    title:Joi.string().min(3).max(200),
    image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg','image/webp').required(),
        destination: Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size: Joi.number().max(5242880).required()
      })
    //here can update image

})
export const deletecategorySchema=Joi.object({
    id:Joi.string().hex().length(24).required(),

})