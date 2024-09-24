import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import productModel from "../../../../db/models/product.model.js";
import { deleteOne,getAllItems,getitembyid } from "../../handlers/apihandlers.js";

export const addProduct = handleError(async (req, res,next) => {
 
  req.body.slug = slugify(req.body.title);

  req.body.imageCover = req.files.imageCover[0].filename
  req.body.images = req.files.images.map(ele=>ele.filename)

  //here i want show details before store in db
  const preProduct = new productModel(req.body);
  let addProduct = await preProduct.save();
  res.json({ message: "Added Products", addProduct });
});


export const getAllProducts = getAllItems(productModel)

export const getProductById =getitembyid(productModel)

export const updateProducts = handleError(async (req, res,next) => {

  req.body.slug = slugify(req.body.title);
  if(req.file)
    req.body.image = req.file.filename;

  const updateProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  updateProduct && res.json({ message: "Done", updateProduct });
  !updateProduct && res.json({ message: "Not Found" });
});

export const deleteProduct =deleteOne(productModel)
