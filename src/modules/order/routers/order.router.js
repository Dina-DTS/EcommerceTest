import express from "express";
import { allowTo, protectRoutes } from "../../auth/auth.controller.js";
import {
  addOrder,
  getAllOrders,
  getorder,
  getorderById,
  onlinePayment,
} from "../controllers/order.controller.js";
import { validation } from "../../../middleware/validation.js";
import {
  addOrderValidationSchema,
  validIDSchema,
} from "../validations/order.validation.js";
const app = express();

const OrderRouters = express.Router();


OrderRouters.route("/orderuser")
  .get(protectRoutes, allowTo("User","Admin"), getorder);

OrderRouters.route("/:id")
  .post(
    protectRoutes,
    allowTo("User"),
    validation(addOrderValidationSchema),
    addOrder
  )
  .get(
    protectRoutes,
    allowTo("User", "Admin"),
    validation(validIDSchema),
    getorderById
  );

OrderRouters.route("/")
.get(protectRoutes, allowTo("Admin"), getAllOrders);

OrderRouters.route("/checkout/:id").post(protectRoutes, allowTo("User"),validation(addOrderValidationSchema),onlinePayment);

export default OrderRouters;
