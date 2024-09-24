import { handleError } from "../../../middleware/handleError.js";
import userModel from "../../../../db/models/user.model.js";
import { deleteOne,getAllItems,getitembyid } from "../../handlers/apihandlers.js";
import { AppError } from "../../../../utils/AppError.js";


export const addUser = handleError(async(req, res,next) => {
  let user= await userModel.findOne({email:req.body.email})
  if (user) {
 return next(new AppError("Duplicate Email",409))
  }
  
  const preuser = new userModel(req.body);
  let adduser = await preuser.save();
  res.json({ message: "Added user", adduser });
});


export const getAlluser = getAllItems(userModel)

export const getuserById = getitembyid(userModel)

export const updateuser = handleError(async (req, res,next) => {

    let {id}=req.params

  const updateuser = await userModel.findOneAndUpdate(
    {_id:id},
    req.body,
    { new: true }
  );
  updateuser && res.json({ message: "Done", updateuser });
  !updateuser && res.json({ message: "Not Found" });
});

export const deleteuser =deleteOne(userModel)

export const changePassword = handleError(async (req, res,next) => {
     let {id}=req.params
     req.body.changePasswordAt=Date.now();
     
    const updateuser = await userModel.findOneAndUpdate({_id:id},req.body,{new:true} );
    updateuser && res.json({ message: "Done", updateuser });
    !updateuser && res.json({ message: "Not Found" });
  });
  
