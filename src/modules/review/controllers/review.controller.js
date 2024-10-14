
import productModel from "../../../../db/models/product.model.js";
import reviewModel from "../../../../db/models/review.model.js";
import { AppError } from "../../../../utils/AppError.js";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne,getAllItems,getitembyid } from "../../handlers/apihandlers.js";



export const addReview = handleError(async (req, res, next) => {
  const { product } = req.body;

  const productExists = await productModel.findById(product);
  if (!productExists) return next(new AppError("Product not found.", 404));

  const isReview = await reviewModel.findOne({ createdby: req.user._id, product });
  if (isReview) return next(new AppError("You have already reviewed this product.", 409));

  const newReview = await reviewModel.create({ ...req.body, createdby: req.user._id });

  res.status(201).json({ message: "Review added successfully.", review: newReview });
});
  
  export const getAllReviews = getAllItems(reviewModel)
  
  export const getreviewById = getitembyid(reviewModel)
  
  export const updateReview = handleError(async (req, res, next) => {
    const { id } = req.params;
    const { text, rating, product } = req.body;
  
    // Check if the review exists
    const review = await reviewModel.findById(id);
    if (!review) return next(new AppError("Review not found", 404));
  
    // Check if the logged-in user is the creator of the review
    if (review.createdby.toString() !== req.user._id.toString()) {
      return next(new AppError("You are not authorized to update this review", 403));
    }
  
    // Validate product association if product is provided
    if (product) {
      const productExists = await productModel.findById(product);
      if (!productExists) return next(new AppError("Product not found", 404));
    }
  
    // Prepare update object
    const updateFields = {};
    if (text) updateFields.text = text;
    if (rating) updateFields.rating = rating;
    if (product) updateFields.product = product;
    updateFields.updatedAt = Date.now(); // Automatically update the timestamp
  
    // Update the review with the provided fields (only those that are present)
    const updatedReview = await reviewModel.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });
  
    // Respond with the updated review
    res.json({ message: "Review updated successfully.", review: updatedReview });
  });
  export const deleteReview =deleteOne(reviewModel)
  