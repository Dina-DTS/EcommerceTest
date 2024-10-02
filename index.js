import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connecttodb from "./db/db.connection.js";
import Allrouter from "./routers/v1.routes.js";
import { AppError } from "./utils/AppError.js";
import { handleError } from "./src/middleware/handleError.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OnNMxDuWEVNKbHFsQODM66IZm1OxHxCNQAoIKbBqgubHplCKoRbdNEJdIswhJ3gCHwgoOUajYNNnFTmw1w0kXmf00WGWaMWBx');




dotenv.config();
const app = express();
const port = +process.env.PORT;// Match the raw body to content type application/json



app.post('/api/webhook', express.raw({type: 'application/json'}), handleError(async(req, res) => {
  const sig = req.headers['stripe-signature'].toString;

  let event= stripe.webhooks.constructEvent(req.body, sig, "whsec_ip0MTEI5JmPQiC8RmXbvYvZ8VaeTcRXP");

    let checkoutSessionCompleted;
  if(event.type=="checkout.session.completed")
    {
      checkoutSessionCompleted=event.data.object;
     // create order
    }
    else{
     console.log(`Unhandled event type ${event.type}`);
   
    } 
 

  // Return a response to acknowledge receipt of the event
  res.json({message:"success",checkoutSessionCompleted});
}));














app.use(express.json({ limit: '10mb' }));
app.use(cors())

// Increase the limit for JSON payloads

// Increase the limit for URL-encoded payloads
app.use(express.urlencoded({ limit: '10mb', extended: true }));



app.use("/uploads",express.static("uploads"))

Allrouter(app)


app.use('*',(req,res,next)=>{
    next(new AppError("URL Not Found",404))
})

//hello
//global error to handle handleerror middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode).json({message:err.message,stack:err.stack})
  })
connecttodb();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
