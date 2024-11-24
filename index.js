import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connecttodb from "./db/db.connection.js";
import Allrouter from "./routers/v1.routes.js";
import { AppError } from "./utils/AppError.js";
import { createOnlinePayment } from "./src/modules/order/controllers/order.controller.js";
dotenv.config();
const app = express();
const port = +process.env.PORT; // Match the raw body to content type application/json


app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  createOnlinePayment
);

app.use(express.json({ limit: "10mb" }));
app.use(cors());


// Increase the limit for URL-encoded payloads
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static("uploads"));

Allrouter(app);

app.use("*", (req, res, next) => {
  next(new AppError("URL Not Found", 404));
});

//hello
//global error to handle handleerror middleware
// app.use((err, req, res, next) => {
//   res.status(err.statusCode).json({ message: err.message, stack: err.stack });
// });
app.use((err, req, res, next) => {
  const isDevelopment = process.env.MODE === 'development';
  res.status(err.statusCode || 500).json({
    message: err.message,
    ...(isDevelopment && { stack: err.stack }),
  });
});

connecttodb();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
