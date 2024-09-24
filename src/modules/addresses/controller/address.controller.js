import { handleError } from "../../../middleware/handleError.js";
import userModel from "../../../../db/models/user.model.js";



export const addToAddress = handleError(async (req, res, next) => {
    let { city, street } = req.body; // Ensure both city and street are received

    const updateUser = await userModel.findOneAndUpdate(
        { _id: req.user._id }, // Correctly find the user by their ID
        {
            $addToSet: { 
                addresses: { city, street } // Add both city and street to the addresses array
            }
        },
        { new: true } // Return the updated document
    );

    updateUser
        ? res.json({ message: "Address added", updateUser })
        : res.status(404).json({ message: "User not found" });
});



export const removeFromAddresses = handleError(async (req, res,next) => {
    let{city,street}=req.body

    
  const remove = await userModel.findOneAndUpdate(
    req.user._id,
    {
        $pull: { 
            addresses: { city, street } // Add the city and street as an object to the addresses array
        }
    },
    { new: true }
  );
  remove && res.json({ message: "Done ", remove });
  !remove && res.json({ message: "Not Found" });
});
export const getAlladdresses = handleError(async (req, res,next) => {

  const exists = await userModel.findOne(
   {_id :req.user._id},
  );
  exists && res.json({ message: "Done ", exists:exists.addresses });
  !exists && res.json({ message: "Not Found" });
});



