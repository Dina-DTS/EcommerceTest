import mongoose from "mongoose";


const categorySchema = new mongoose.Schema(
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
		image: String,
        createdby:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
	},
	{ timestamps: true }
)


/**The init Hook

    The init hook is a middleware function in Mongoose that is triggered after a document is initialized from the database but before it is returned to you (the developer) in your code.
    This hook is a good place to modify the document before you start working with it. */

	
categorySchema.post("init",function(doc){
    doc.image=process.env.BASE_URL+"uploads/"+doc.image
})

const categoryModel = mongoose.model('Category', categorySchema)

export default categoryModel
