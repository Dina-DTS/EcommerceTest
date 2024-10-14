import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			minLength: 3,
			maxLength: 10000,
			required: true,
			trim: true,
		},
		
		product: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Product',
		},
		createdby: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		rating:{
			type:Number,
			min:1,
			max:5
		}
	},
	{ timestamps: true }
)
// reviewSchema.pre(/^find/,function(){
// 	this.populate('createdby','name')
// })


const reviewModel = mongoose.model('Review', reviewSchema)

export default reviewModel
