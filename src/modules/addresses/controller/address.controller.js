import { handleError } from "../../../middleware/handleError.js";
import userModel from "../../../../db/models/user.model.js";
import { AppError } from "../../../../utils/AppError.js";



export const addToAddress = handleError(async (req, res, next) => {
    

    const { city, street } = req.body; // Ensure both city and street are received

    // Update user by adding address
    const updateUser = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
            $addToSet: {
                addresses: { city, street } // Add both city and street to the addresses array
            }
        },
        { new: true }
    ).select('name addresses');

    if (!updateUser) {
        return next(new AppError("User not found", 404));
    }

    res.json({ message: "Address added", user: updateUser });
});



export const removeFromAddresses = handleError(async (req, res, next) => {
    const { addressId } = req.body; // Expecting an addressId to remove

    // Validate that addressId is provided
    if (!addressId) {
        return next(new AppError("Address ID is required", 400));
    }

    // Update user by pulling the address with the specified ID
    const remove = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
            $pull: { 
                addresses: { _id: addressId } // Remove the address with the given ID
            }
        },
        { new: true }
    ).select('name addresses')

    if (!remove) {
        return next(new AppError("User not found", 404));
    }

    res.json({ message: "Address removed", updatedUser: remove });
});

export const getAllAddresses = handleError(async (req, res, next) => {
    const user = await userModel.findById(req.user._id).select('addresses'); // Select only the addresses field

    if (!user) {
        return next(new AppError("User not found", 404)); // Return error if user does not exist
    }

    res.json({ message: "Done", addresses: user.addresses }); // Return the addresses
});




