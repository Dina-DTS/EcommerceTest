import ApiFeatures from "../../../utils/services/ApiFeatures.js";
import { handleError } from "../../middleware/handleError.js";
import QRCode from 'qrcode'
import couponModel from "../../../db/models/coupon.model.js";
import { AppError } from "../../../utils/AppError.js";



export const deleteOne = (model) => {
  return handleError(async (req, res, next) => {
    // Find the item by its ID
    const item = await model.findById(req.params.id);

    // If item doesn't exist, return error
    if (!item) {
      return next(new AppError("Item not found", 404));
    }

    // Check if the logged-in user is either the creator of the item or has an admin role
    if (!req.user || (!req.user._id.equals(item.createdby) && req.user.role !== 'Admin')) {
      return next(new AppError("You are not authorized to delete this item", 403));
    }

    // Proceed with deleting the item
    await model.findByIdAndDelete(req.params.id); // Directly use findByIdAndDelete

    // Respond with a success message
    res.json({ message: "Deleted", item });
  });
};



export const getitembyid = (model) => {
  return handleError(async (req, res, next) => {
    const { id } = req.params;
    
    const getItem = await model.findById(id);

    if (!getItem) {
      return next(new AppError("Item not found", 404));
    }

    let response = { message: "Done", getItem };

    // If the model is 'couponModel', generate a QR code and include it in the response
    if (model === couponModel) {
      const url = await QRCode.toDataURL(getItem.code); // Assuming `getItem.code` contains the coupon code
      response.url = url;
    }

    // Return the item (and QR code if applicable)
    res.json(response);
  });
};


export const getAllItems = (model, filters = {}) => {
  return handleError(async (req, res, next) => {
    // Merge dynamic filters from request parameters (if any) with predefined filters
    let filtersObject = { ...filters };

    // If additional filter comes in the request params or query (like category), add it
    if (req.params.category) {
      filtersObject.category = req.params.category;
    }

    // Apply filters using ApiFeatures
    let apifeature = new ApiFeatures(model.find(filtersObject), req.query)
      .pagination()
      .sort()
      .fields()
      .filter()
      .search();

    let getObjects = await apifeature.mongooseQuery;

    if (getObjects.length === 0) {
      return next(new AppError("No items found", 404));
    }

    res.json({ message: "Done Get All items", getObjects, page: apifeature.page });
  });
};

