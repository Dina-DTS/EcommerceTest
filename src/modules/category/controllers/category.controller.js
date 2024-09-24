import slugify from "slugify";
import categoryModel from "../../../../db/models/category.model.js";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne, getAllItems, getitembyid } from "../../handlers/apihandlers.js";



export const addCategory = handleError(async (req, res,next) => {
  // console.log(req.file)

  req.body.slug = slugify(req.body.title);

  req.body.image = req.file.filename;

  //here i want show details before store in db
  const preCategory = new categoryModel(req.body);
  let addCategory = await preCategory.save();
  res.json({ message: "Added", addCategory });
});


export const getAllCategries = getAllItems(categoryModel)

export const getCategoryById = getitembyid(categoryModel)

export const updatecategory = handleError(async (req, res,next) => {
  if(req.body.title){
    req.body.slug = slugify(req.body.title);

  }
  const updatecategory = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updatecategory && res.json({ message: "Done", updatecategory });
  !updatecategory && res.json({ message: "Not Found" });
});

export const deletecategory =deleteOne(categoryModel)
