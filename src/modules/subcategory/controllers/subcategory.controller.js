import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import subcategoryModel from "../../../../db/models/subcategoty.model.js";
import { deleteOne, getAllItems, getitembyid } from "../../handlers/apihandlers.js";
import ApiFeatures from "../../../../utils/services/ApiFeatures.js";



export const addsubcategory = handleError(async (req, res,next) => {

  req.body.slug = slugify(req.body.title);

  req.body.image = req.file.filename;
  req.body.createdby=req.user._id

  //here i want show details before store in db
  const preCategory = new subcategoryModel(req.body);
  let addsubCategory = await preCategory.save();
  res.json({ message: "Added", addsubCategory });
});


export const getAllSubCategries = getAllItems(subcategoryModel)

export const getsubCategoryById = getitembyid(subcategoryModel)


export const updateSubcategory = handleError(async (req, res,next) => {
  if(req.body.title){
    req.body.slug = slugify(req.body.title);

  }

  const updateSubcategory = await subcategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updateSubcategory && res.json({ message: "Done", updateSubcategory });
  !updateSubcategory && res.json({ message: "Not Found" });
})


export const deleteSubcategory = deleteOne(subcategoryModel)