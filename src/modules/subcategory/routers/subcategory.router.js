import express from 'express'
import { validation } from '../../../middleware/validation.js'
import { uploadSingle } from '../../../../utils/fileUpload.js'
import { addsubcategory, deleteSubcategory, getAllSubCategries, getsubCategoryById, updateSubcategory } from '../controllers/subcategory.controller.js'
import { addSubCategoryShema, deleteSubcategorySchema, getSubcategoryByIDSchema, updateSubcategorySchema } from '../validation/subcategory.validation.js'


const SubcategoryRoutes=express.Router({mergeParams:true})


SubcategoryRoutes.route("/")
.post(uploadSingle('image'),validation(addSubCategoryShema),addsubcategory)
.get(getAllSubCategries)


SubcategoryRoutes.route("/:id")
.get(validation(getSubcategoryByIDSchema),getsubCategoryById)
.patch(validation(updateSubcategorySchema),updateSubcategory)
.delete(validation(deleteSubcategorySchema),deleteSubcategory)

export default SubcategoryRoutes