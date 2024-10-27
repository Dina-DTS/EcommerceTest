import { handleError } from "../../../middleware/handleError.js";
import userModel from "../../../../db/models/user.model.js";
import { AppError } from "../../../../utils/AppError.js";



export const addToWishlist = handleError(async (req, res, next) => {
  
  const { product } = req.body;

  // Additional checks or database operations
  const updateuser = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      {
          $addToSet: { WishList: product }
      },
      { new: true }
  ).select('name WishList');  // Select only the fields you want to return
  ;

  if (!updateuser) {
      return next(new AppError("User not found", 404));
  }

  res.json({ message: "Done", updateuser });
});


export const removeFromWishlist = handleError(async (req, res, next) => {
  
    const { product } = req.body;

    // Check if the product exists in the user's wishlist
    const user = await userModel.findById(req.user._id);
    if (!user || !user.WishList.includes(product)) {
        return next(new AppError("Product not found in wishlist", 404));
    }

    // Remove product from wishlist and return only name and wishlist fields
    const updatedUser = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
            $pull: { WishList: product }
        },
        { new: true }
    ).select('name WishList'); // Select only name and WishList fields

    res.json({ message: "Done Removed", user: updatedUser });
});

export const getAllWishlist = handleError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).select('WishList');

  if (!user) {
      return next(new AppError("User not found", 404));
  }

  res.json({ message: "Here Your Wishlist", wishlist: user.WishList });
});



