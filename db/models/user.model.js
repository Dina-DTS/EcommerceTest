import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userschema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minLength: 3,
			maxLength: 500,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique:true
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		role: {
			type: String,
			enum: ['User', 'Admin'],
			default: 'User',
		},
		WishList:[{
			type:mongoose.Types.ObjectId,
			ref:"Product",
		}],
		addresses:[{
			city:String,
			street:String,
			
		}],
		blocked: {
			type: Boolean,
			default: false,
		},
		changePasswordAt:Date,
		Active: {
			type: Boolean,
			default: false,
		},
		phone:{
			type:String,
			unique:true
		},

	},
	{ timestamps: true }
)

// here using document mongoose middleware so consle  fields related  so use this.field

userschema.pre("save",function(){
	this.password= bcrypt.hashSync(this.password,5)
})

// here using query mongoose middleware so consle all fields related to obj or not so use update.field

userschema.pre("findOneAndUpdate", function(next) {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 5);
    }
    next();
});

const userModel = mongoose.model('User', userschema)

export default userModel
