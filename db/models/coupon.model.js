import mongoose from 'mongoose'

const couponschema = new mongoose.Schema(
	{
		
		
		code: {
			type: String,
			minlength: 3,
			maxlength: 200,
			required: [true, 'Coupon code is required'],
			trim: true,
			unique: true,
			match: [/^[A-Z0-9]+$/, 'Coupon code must be alphanumeric and uppercase'],
		  },
		  expiry: {
			type: Date,
			required: [true, 'Expiry date is required'],
			validate: {
			  validator: function (value) {
				return value > Date.now()
			  },
			  message: 'Expiry date must be in the future',
			},
		  },
		  discount: {
			type: Number,
			required: [true, 'Discount value is required'],
			min: [0, 'Discount cannot be negative'],
			max: [100, 'Discount cannot exceed 100%'],
		  },
		  // Optional: Add fields like `usageLimit`, `timesUsed`, etc.
		 createdby:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		 },
		 updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',  // Reference to the User model, or just store the ID
		  },
		},
		{ timestamps: true }
)



const couponModel = mongoose.model('Coupon', couponschema)

export default couponModel
