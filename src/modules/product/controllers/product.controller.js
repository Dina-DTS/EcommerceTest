import slugify from "slugify";
import { handleError } from "../../../middleware/handleError.js";
import productModel from "../../../../db/models/product.model.js";
import { deleteOne,getAllItems,getitembyid } from "../../handlers/apihandlers.js";
import categoryModel from "../../../../db/models/category.model.js";
import subcategoryModel from "../../../../db/models/subcategoty.model.js";
import { AppError } from "../../../../utils/AppError.js";
import brandModel from "../../../../db/models/brand.model.js";


// Helper function for validating category, subcategory, and brand if they are provided
const validateProductAssociations = async (categoryId, subcategoryId, brandId) => {
  const errors = [];

  if (categoryId) {
    const category = await categoryModel.findById(categoryId);
    if (!category) errors.push("Category ID not found");
  }

  if (subcategoryId) {
    const subcategory = await subcategoryModel.findById(subcategoryId);
    if (!subcategory) {
      errors.push("Subcategory ID not found");
    } else if (categoryId && !subcategory.category.equals(categoryId)) {
      errors.push("Subcategory does not belong to the selected category");
    }
  }

  if (brandId) {
    const brand = await brandModel.findById(brandId);
    if (!brand) errors.push("Brand ID not found");
  }

  return errors;
};

// Add Product
export const addProduct = handleError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.images = req.files.images.map(ele => ele.filename);
  req.body.imageCover = req.files.imageCover[0].filename
  req.body.createdby = req.user._id;

  // Validate associations
  const validationErrors = await validateProductAssociations(req.body.category, req.body.subcategory, req.body.brand);

  // Validate priceAfterDiscount
  if (req.body.priceAfterdiscount < 0) validationErrors.push("Price after discount cannot be negative");
  if (req.body.priceAfterdiscount > req.body.price) validationErrors.push("Price after discount cannot be higher than the original price");

  // If validation errors exist, return them all at once
  if (validationErrors.length > 0) {
    return next(new AppError(validationErrors.join('&&'), 400));
  }

  // Save the product
  const preProduct = new productModel(req.body);
  const addProduct = await preProduct.save();
  res.status(201).json({ message: "Product added successfully", addProduct });
});

// Update Product
export const updateProducts = handleError(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = req.body.title ? slugify(req.body.title) : req.body.slug;

 if (req.files && req.files.images) {
    req.body.images = req.files.images.map((ele) => ele.filename);
  }
 if (req.files && req.files.imageCover) {
    req.body.imageCover = req.files.imageCover[0].filename
  }

  const product = await productModel.findById(id);

  if (!product) return next(new AppError("Product not found", 404));

  if (product.createdby.toString() !== req.user._id.toString()) {
    return next(new AppError("You are not authorized to update this product", 403));
  }

  const validationErrors = await validateProductAssociations(req.body.category, req.body.subcategory, req.body.brand);

  if (validationErrors.length > 0) {
    return next(new AppError(validationErrors.join('\n'), 400));
  }

  const updateProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

  if (req.body.priceAfterdiscount && req.body.priceAfterdiscount > req.body.price) {
    return next(new AppError("Price after discount cannot be higher than the original price", 400));
  }

  res.json({ message: "Product updated successfully", updateProduct });
});

export const getAllProducts = getAllItems(productModel)

export const getProductById =getitembyid(productModel)


export const deleteProduct =deleteOne(productModel)
