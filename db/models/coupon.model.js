import mongoose from 'mongoose'

const couponschema = new mongoose.Schema(
	{
		
		
		code: {
			type: String,
			minLength: 3,
			maxLength: 200,
			required: true,
			trim: true,
			unique: true,
		},
		expiry: {
			type: String,
			required: true,
		},
		discount: {
			type: Number,
			required: true,
			min:0
		},
		
	},
	{ timestamps: true }
)



const couponModel = mongoose.model('Coupon', couponschema)

export default couponModel
