import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import productModel from "../../../../db/models/product.model.js";
import { deleteOne,getAllItems,getitembyid } from "../../handlers/apihandlers.js";
import categoryModel from "../../../../db/models/category.model.js";
import subcategoryModel from "../../../../db/models/subcategoty.model.js";
import brandModel from "../../../../db/models/brand.model.js";
import { AppError } from "../../../../utils/AppError.js";

export const addProduct = handleError(async (req, res, next) => {
  // Validate request data
  const { category, subcategory, brand, priceAfterdiscount } = req.body;

  // Check if the category exists
  const foundCategory = await categoryModel.findOne({_id:category});
  if (!foundCategory) { 
    return next(new AppError('Category not found', 404)); // Use AppError
  }

  // Check if the subcategory exists and is related to the category
  const foundSubcategory = await subcategoryModel.findOne({ _id: subcategory, category: category });
  if (!foundSubcategory) {
    return next(new AppError('Subcategory not found or does not belong to the specified category', 404)); // Use AppError
  }

  // Check if the brand exists
  const foundBrand = await brandModel.findById(brand);
  if (!foundBrand) {
    return next(new AppError('Price after discount cannot be negative', 400)); // Use AppError
  }

  // Check if priceAfterDiscount is negative
  if (priceAfterdiscount < 0) {
    return next(new AppError('Price after discount cannot be negative', 400)); // Use AppError
  }

  // Proceed with product creation
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map(ele => ele.filename);
  req.body.createdby = req.user._id;

  // Create a new product instance
  const preProduct = new productModel(req.body);

  // Log the product details before saving
  console.log('Product Details:', preProduct);

  // Save the product to the database
  let addProduct = await preProduct.save();
  res.json({ message: "Added Product", addProduct });
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
