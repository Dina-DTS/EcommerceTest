import express from 'express'
import { addCategory, deletecategory, getAllCategries, getCategoryById, updatecategory } from '../controllers/category.controller.js'
import { validation } from '../../../middleware/validation.js'
import { addCategoryShema, deletecategorySchema, getByIDSchema, updatecategorySchema } from '../validtion/category.validation.js'
import { uploadSingle } from '../../../../utils/fileUpload.js'
import SubcategoryRoutes from '../../subcategory/routers/subcategory.router.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'


const categoryRoutes=express.Router()
categoryRoutes.use("/:category/subCategory",SubcategoryRoutes)


categoryRoutes.route("/")
.post(protectRoutes,allowTo("Admin"),uploadSingle('image'),validation(addCategoryShema),addCategory)
.get(protectRoutes,allowTo("Admin","User"),getAllCategries)


categoryRoutes.route("/:id")
.get(protectRoutes,allowTo("Admin","User"),validation(getByIDSchema),getCategoryById)
.patch(protectRoutes,allowTo("Admin"),validation(updatecategorySchema),updatecategory)
.delete(protectRoutes,allowTo("Admin"),validation(deletecategorySchema),deletecategory)

export default categoryRoutes