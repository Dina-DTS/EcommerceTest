import ApiFeatures from "../../../utils/services/ApiFeatures.js";
import { handleError } from "../../middleware/handleError.js";
import QRCode from 'qrcode'
import couponModel from "../../../db/models/coupon.model.js";
import { AppError } from "../../../utils/AppError.js";



export const deleteOne = (model) => {
  return handleError(async (req, res, next) => {
    const item = await model.findByIdAndDelete(req.params.id);

    if (!item) {
      return next(new AppError("Item not found", 404));
    }

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

    let getItems = await apifeature.mongooseQuery;

    if (getItems.length === 0) {
      return next(new AppError("No items found", 404));
    }

    res.json({ message: "Done Get All items", getItems, page: apifeature.page });
  });
};

