import mongoose from "mongoose";
import { AppError } from "./AppError.js";
import multer from "multer";

const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, new mongoose.Types.ObjectId() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    // Accept only images
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("Invalid image type", 400), false); // Changed status code to 400
    }
  }

  const upload = multer({ storage, fileFilter });
  return upload;
};

export const uploadSingle = (fieldName) => uploadFile().single(fieldName);
export const uploadFields = (fieldsName) => uploadFile().fields(fieldsName);
