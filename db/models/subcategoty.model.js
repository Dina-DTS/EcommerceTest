import mongoose from "mongoose";


const subcategorySchema = new mongoose.Schema(
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
		image:String,
		category: {
            type:mongoose.Types.ObjectId,
            ref:"Category"
        },
        createdby:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
	},
	{ timestamps: true }
)


const subcategoryModel = mongoose.model('Subcategory', subcategorySchema)

export default subcategoryModel
