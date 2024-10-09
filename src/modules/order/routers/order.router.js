import express from "express";
import { protectRoutes } from "../../auth/auth.controller.js";
import {
  addOrder,
  createOnlinePayment,
  getAllOrders,
  getorder,
  getorderById,
  onlinePayment,
} from "../controllers/order.controller.js";
const app = express();

const OrderRouters = express.Router();

OrderRouters.route("/:id")
  .post(protectRoutes, addOrder)
  .get(protectRoutes, getorderById);

OrderRouters.route("/")
  .get(protectRoutes, getAllOrders)
  .get(protectRoutes, getorder);

OrderRouters.route("/checkout/:id").post(protectRoutes, onlinePayment);
// Add the webhook route with express.raw() middleware
OrderRouters.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  createOnlinePayment
);

// OrderRouters.post(
//     "/api/webhook",
//     express.raw({ type: "application/json" }),createOnlinePayment)

export default OrderRouters;
