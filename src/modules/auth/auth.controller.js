import userModel from "../../../db/models/user.model.js";
import { AppError } from "../../../utils/AppError.js";
import { handleError } from "../../middleware/handleError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const signUp = handleError(async (req, res, next) => {
  let isFound = await userModel.findOne({ email: req.body.email });
  if (isFound) return next(new AppError("email already exit", 409));
  let user = new userModel({ ...req.body, Active: true });
  await user.save();
  res.json({ message: "Added user", user });
});


export const SignIN = handleError(async (req, res, next) => {
  let { email, password } = req.body;

  // Find the user by email
  let isFound = await userModel.findOne({ email });
  // Only proceed with password comparison if the user is found
  if (isFound && (await bcrypt.compare(password, isFound.password))) {
    let token = jwt.sign(
      { name: isFound.name, userId: isFound._id, role: isFound.role },
      "user"
    );
    return res.json({ message: "success login", token });
  }

  // If user is not found or password doesn't match
  return next(new AppError("incorrect email or password", 401));
});


export const protectRoutes = handleError(async (req, res, next) => {
  //1-check have Token
  let { token } = req.headers;
  if (!token) return next(new AppError("please provide token", 401));
  //2- verfiy token
  let decoded = await jwt.verify(token, "user");
  //3-if user exit
  let user = await userModel.findById(decoded.userId);
  
  if (!user) return next(new AppError("User Not Found By This Id", 401));
  //4-if this token is last one version
  if (user.changePasswordAt) {
    let changePasswordAt = parseInt(user.changePasswordAt.getTime() / 1000);
    if (changePasswordAt > decoded.iat)
      return next(new AppError("invalid token", 401));
  }
  req.user = user;

  next();
});

export const allowTo=(...roles)=>{

    return handleError(async(req,res,next)=>{
        if(!roles.includes(req.user.role))
            return next (new AppError("You arn not Autherized",403))
        next()
    })
}