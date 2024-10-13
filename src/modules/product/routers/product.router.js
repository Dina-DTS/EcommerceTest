import express from "express";
import { validation } from "../../../middleware/validation.js";
import { uploadFields } from "../../../../utils/fileUpload.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProducts,
} from "../controllers/product.controller.js";
import {
  addProductShema,
  deleteProductSchema,
  getProductByIDSchema,
  updateProductSchema,
} from "../validations/product.validation.js";
import { allowTo, protectRoutes } from "../../auth/auth.controller.js";

const ProductRoutes = express.Router();

// Route for adding a product
ProductRoutes.route("/")
  .post(
    protectRoutes,
    allowTo("Admin"),
    uploadFields([
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(addProductShema),
    addProduct
  )
  .get(getAllProducts);

ProductRoutes.route("/:id")
  .get(validation(getProductByIDSchema), getProductById)
  .patch(
    protectRoutes,
    allowTo("Admin"),
    uploadFields([
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]),
    validation(updateProductSchema),
    updateProducts
  )
  .delete( protectRoutes,
    allowTo("Admin"),validation(deleteProductSchema), deleteProduct);

export default ProductRoutes;
