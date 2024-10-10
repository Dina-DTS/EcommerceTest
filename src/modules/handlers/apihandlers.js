import ApiFeatures from "../../../utils/services/ApiFeatures.js";
import { handleError } from "../../middleware/handleError.js";
import QRCode from 'qrcode'
import couponModel from "../../../db/models/coupon.model.js";



export const deleteOne=(model)=>{
   return handleError(async (req, res,next) => {
        const items = await model.findByIdAndDelete(req.params.id);
        items && res.json({ message: "Delted", items });
        !items && res.json({ message: "Not Found" });
      });
      
}

export const getitembyid=(model)=>{
 return handleError(async (req, res,next) => {
  const { id } = req.params;
    const getItem = await model.findById(id);

    if (!getItem) {
      return res.json({ message: "Not Found" });
    }

    let response = { message: "Done", getItem };

    // If the model is 'couponModel', generate a QR code and include it in the response
    if (model === couponModel) {
      const url = await QRCode.toDataURL(getItem.code); // assuming `getItem.code` contains the coupon code
      response.url = url;
    }

    res.json(response);
  });
}

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
    res.json({ message: "Done Get All items", getItems, page: apifeature.page });
  });
};
