import Joi from "joi";

export const addProductShema=Joi.object({

    title:Joi.string().min(3).max(200).required().trim(),
    description:Joi.string().min(3).max(10000).required().trim(),
    price:Joi.number().min(50).required(),
    priceAfterdiscount:Joi.number().min(0).required(),
    quantity:Joi.number().min(1).required(),
    category:Joi.string().hex().length(24).required(),
    subcategory:Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    createdby: Joi.string().hex().length(24).optional(),

    imageCover:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        destination: Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size: Joi.number().max(5242880).required()
      }).required()).length(1).required(),

    images:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        destination: Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size: Joi.number().max(5242880).required()
      }).required()).required()
      
})

export const getProductByIDSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
})
export const updateProductSchema=Joi.object({
    id:Joi.string().hex().length(24).required(),

    title:Joi.string().min(3).max(200).required().trim(),
    description:Joi.string().min(3).max(10000).trim(),
    price:Joi.number().min(0),
    priceAfterdiscount:Joi.number().min(0),
    quantity:Joi.number().min(0),
    category:Joi.string().hex().length(24),
    subcategory:Joi.string().hex().length(24),
    brand: Joi.string().hex().length(24),
    createdby: Joi.string().hex().length(24).optional()


})
export const deleteProductSchema=Joi.object({
    id:Joi.string().hex().length(24).required(),

})