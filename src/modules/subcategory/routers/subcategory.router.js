import express from 'express'
import { validation } from '../../../middleware/validation.js'
import { uploadSingle } from '../../../../utils/fileUpload.js'
import { addsubcategory, deleteSubcategory, getAllSubCategries, getsubCategoryById, updateSubcategory } from '../controllers/subcategory.controller.js'
import { addSubCategoryShema, deleteSubcategorySchema, getSubcategoryByIDSchema, updateSubcategorySchema } from '../validation/subcategory.validation.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'


const SubcategoryRoutes=express.Router({mergeParams:true})


SubcategoryRoutes.route("/")
.post(protectRoutes,allowTo("Admin"),uploadSingle('image'),validation(addSubCategoryShema),addsubcategory)
.get(getAllSubCategries)


SubcategoryRoutes.route("/:id")
.get(protectRoutes,allowTo("Admin","User"),validation(getSubcategoryByIDSchema),getsubCategoryById)
.patch(protectRoutes,allowTo("Admin"),validation(updateSubcategorySchema),updateSubcategory)
.delete(protectRoutes,allowTo("Admin"),validation(deleteSubcategorySchema),deleteSubcategory)

export default SubcategoryRoutes