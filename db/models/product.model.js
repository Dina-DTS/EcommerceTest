import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 200,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      minLength: 3,
      maxLength: 200,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      minLength: 3,
      maxLength: 10000,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    priceAfterdiscount: {
      type: Number,
      min: 0,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: mongoose.Types.ObjectId,
      ref: "Subcategory",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
    imageCover: String,
    images: [String],
    sold: {
        type:Number,
        required:true,
        default:0
    },
    quantity: {
        type:Number,
        required:true,
        default:0
    },
    rateCount:Number,
    rateAva:{
        type:Number,
        min:0,
        max:5

    },
    createdby:{
      type:mongoose.Types.ObjectId,
      ref:"User"
  },
  },
  { timestamps: true, toJSON: { virtuals: true },toObject:{virtuals:true}}
);

productSchema.post("init",function(doc){
  doc.imageCover=process.env.BASE_URL+"uploads/"+doc.imageCover
  if(doc.images)
  doc.images= doc.images.map(ele=>process.env.BASE_URL+"uploads/"+ele) 
})


productSchema.virtual('myReviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: true
});
//localfield ,foreignfield ==>_id(product) meet in Review(product field there)

productSchema.pre(/^find/,function(){
  this.populate("myReviews")
})

const productModel = mongoose.model("Product", productSchema);



export default productModel;
