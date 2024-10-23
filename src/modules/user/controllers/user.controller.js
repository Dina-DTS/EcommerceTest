import { handleError } from "../../../middleware/handleError.js";
import userModel from "../../../../db/models/user.model.js";
import { deleteOne,getAllItems,getitembyid } from "../../handlers/apihandlers.js";
import { AppError } from "../../../../utils/AppError.js";



export const getAlluser = getAllItems(userModel)

export const getuserById = getitembyid(userModel)

export const updateuser = handleError(async (req, res, next) => {
  const { id } = req.params;

  // Find the user by ID and update the user
  const updateuser = await userModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );

  // If the user is not found, throw an error
  if (!updateuser) {
    return next(new AppError("User not found", 404)); // Use AppError for user not found
  }

  // If the update is successful, return the updated user
  res.json({ message: "User updated successfully", updateuser });
});


export const deleteuser =deleteOne(userModel)

export const changePassword = handleError(async (req, res, next) => {
  // Use the ID from the authenticated user
  const userId = req.user._id; 

  // Update the changePasswordAt field to the current time
  req.body.changePasswordAt = Date.now();

  // Find the user by ID and update the password
  const updateUser = await userModel.findOneAndUpdate(
    { _id: userId },
    req.body,
    { new: true }
  );

  // Check if the user was found and updated
  if (!updateUser) {
    return next(new AppError("User not found", 404)); // Handle user not found case
  }

  res.json({ message: "Password changed successfully", updateUser });
});

