import express from 'express'
import { addCategory, deletecategory, getAllCategries, getCategoryById, updatecategory } from '../controllers/category.controller.js'
import { validation } from '../../../middleware/validation.js'
import { addCategoryShema, deletecategorySchema, getByIDSchema, updatecategorySchema } from '../validtion/category.validation.js'
import { uploadSingle } from '../../../../utils/fileUpload.js'
import SubcategoryRoutes from '../../subcategory/routers/subcategory.router.js'


const categoryRoutes=express.Router()
categoryRoutes.use("/:category/subCategory",SubcategoryRoutes)


categoryRoutes.route("/")
.post(uploadSingle('image'),validation(addCategoryShema),addCategory)
.get(getAllCategries)


categoryRoutes.route("/:id")
.get(validation(getByIDSchema),getCategoryById)
.patch(validation(updatecategorySchema),updatecategory)
.delete(validation(deletecategorySchema),deletecategory)

export default categoryRoutes