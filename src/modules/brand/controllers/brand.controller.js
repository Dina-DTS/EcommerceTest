import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import brandModel from "../../../../db/models/brand.model.js";
import { deleteOne, getAllItems, getitembyid } from "../../handlers/apihandlers.js";
import ApiFeatures from "../../../../utils/services/ApiFeatures.js";


export const addBrand = handleError(async (req, res,next) => {

  req.body.slug = slugify(req.body.title);

  req.body.logo = req.file.filename;

  //here i want show details before store in db
  const preBrand = new brandModel(req.body);
  let addBrand = await preBrand.save();
  res.json({ message: "Added Brand", addBrand });
});


export const getAllBrands = getAllItems(brandModel)

export const getbrandById = getitembyid(brandModel)

export const updateBrand = handleError(async (req, res,next) => {

  req.body.slug = slugify(req.body.title);
  if(req.file)
    req.body.logo = req.file.filename;

  const updatebrand = await brandModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updatebrand && res.json({ message: "Done", updatebrand });
  !updatebrand && res.json({ message: "Not Found" });
});

export const deleteBrand =deleteOne(brandModel)
