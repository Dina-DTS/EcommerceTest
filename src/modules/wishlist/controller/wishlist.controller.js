import { handleError } from "../../../middleware/handleError.js";
import userModel from "../../../../db/models/user.model.js";



export const addToWishlist = handleError(async (req, res,next) => {
    let{product}=req.body
  // here want to check to product

  const updateuser = await userModel.findOneAndUpdate(
    req.user._id,
    {
        $addToSet:{WishList:product}

    },
    { new: true }
  );
  updateuser && res.json({ message: "Done", updateuser });
  !updateuser && res.json({ message: "Not Found" });
});


export const removeFromWishlist = handleError(async (req, res,next) => {
    let{product}=req.body

    
  const remove = await userModel.findOneAndUpdate(
    req.user._id,
    {
        $pull:{WishList:product}

    },
    { new: true }
  );
  remove && res.json({ message: "Done ", remove });
  !remove && res.json({ message: "Not Found" });
});
export const getAllWishlist = handleError(async (req, res,next) => {

  const exists = await userModel.findOne(
   {_id :req.user._id},
  );
  exists && res.json({ message: "Done ", exists:exists.WishList });
  !exists && res.json({ message: "Not Found" });
});



