import mongoose from "mongoose";


const brandSchema = new mongoose.Schema(
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
		logo:String,
        createdby:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
	},
	{ timestamps: true }
)




brandSchema.post("init",function(doc){
    doc.logo=process.env.BASE_URL+"uploads/"+doc.logo
})

const brandModel = mongoose.model('Brand', brandSchema)

export default brandModel
