import express from 'express'
import { validation } from '../../../middleware/validation.js'
import { uploadSingle } from '../../../../utils/fileUpload.js'
import { addBrandShema, deleteBrandSchema, getBrandByIDSchema, updateBrandSchema } from '../validation/brand.validation.js'
import { addBrand, deleteBrand, getAllBrands, getbrandById, updateBrand } from '../controllers/brand.controller.js'


const BrandRoutes=express.Router()


BrandRoutes.route("/")
.post(uploadSingle('image'),validation(addBrandShema),addBrand)
.get(getAllBrands)


BrandRoutes.route("/:id")
.get(validation(getBrandByIDSchema),getbrandById)
.patch(validation(updateBrandSchema),updateBrand)
.delete(validation(deleteBrandSchema),deleteBrand)

export default BrandRoutes