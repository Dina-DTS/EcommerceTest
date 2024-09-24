
import reviewModel from "../../../../db/models/review.model.js";
import { AppError } from "../../../../utils/AppError.js";
import { handleError } from "../../../middleware/handleError.js";
import { deleteOne,getAllItems,getitembyid } from "../../handlers/apihandlers.js";



export const addReview = handleError(async (req, res,next) => {

    //here take user id from req.user
    req.body.createdby=req.user._id
    // here check if user make already review before or not
    let isReview= await reviewModel.findOne({createdby:req.user._id,product:req.body.product})
    if(isReview) return next(new AppError("Already Have Review",409))
    const preReview = new reviewModel(req.body);
    let addReview = await preReview.save();
    res.json({ message: "Added Review", addReview });
  });
  
  
  export const getAllReviews = getAllItems(reviewModel)
  
  export const getreviewById = getitembyid(reviewModel)
  
  export const updateReview = handleError(async (req, res,next) => {
     let {id}=req.params
     req.body.createdby=req.user._id
    const updatereview = await reviewModel.findOneAndUpdate({ _id:id,createdby:req.user._id  },  req.body , { new: true } );

    updatereview && res.json({ message: "Done", updatereview });
    !updatereview && next(new AppError("Not Found This Review Which you want updated",404))
  });
  
  export const deleteReview =deleteOne(reviewModel)
  