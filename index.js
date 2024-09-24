import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connecttodb from "./db/db.connection.js";
import Allrouter from "./routers/v1.routes.js";
import { AppError } from "./utils/AppError.js";

dotenv.config();
const app = express();
const port = +process.env.PORT;

app.use(express.json({ limit: '10mb' }));
app.use(cors())

// Increase the limit for JSON payloads

// Increase the limit for URL-encoded payloads
app.use(express.urlencoded({ limit: '10mb', extended: true }));



app.use("/uploads",express.static("uploads"))

Allrouter(app)


app.use('*',(req,res,next)=>{
    next(new AppError("URL Not Founddd",404))
})

//hello
//global error to handle handleerror middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode).json({message:err.message,stack:err.stack})
  })
connecttodb();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
