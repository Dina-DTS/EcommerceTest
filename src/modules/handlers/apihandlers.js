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

export const getAllItems=(model)=>{
  return  handleError(async (req, res,next) => {
    let apifeature= new ApiFeatures(model.find(),req.query).pagination().sort().fields().filter().search()
     let getitems = await apifeature.mongooseQuery
     res.json({ message: "Done Get All items ", getitems ,page:apifeature.page});
   });
   
}