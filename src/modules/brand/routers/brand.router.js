import express from 'express'
import { validation } from '../../../middleware/validation.js'
import { uploadSingle } from '../../../../utils/fileUpload.js'
import { addBrandShema, deleteBrandSchema, getBrandByIDSchema, updateBrandSchema } from '../validation/brand.validation.js'
import { addBrand, deleteBrand, getAllBrands, getbrandById, updateBrand } from '../controllers/brand.controller.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'


const BrandRoutes=express.Router()


BrandRoutes.route("/")
.post(protectRoutes,allowTo("Admin"),
uploadSingle('image'),validation(addBrandShema),addBrand)
.get(protectRoutes,allowTo("Admin","User"),getAllBrands)


BrandRoutes.route("/:id")
.get(protectRoutes,allowTo("Admin","User"),validation(getBrandByIDSchema),getbrandById)
.patch(protectRoutes,allowTo("Admin"),validation(updateBrandSchema),updateBrand)
.delete(protectRoutes,allowTo("Admin"),validation(deleteBrandSchema),deleteBrand)

export default BrandRoutes