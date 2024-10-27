import express from 'express'
import { addToWishlist, getAllWishlist, removeFromWishlist } from '../controller/wishlist.controller.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'
import { validation } from '../../../middleware/validation.js'
import { wishlistSchema } from '../validations/wishlist.validation.js'

const WishListRoutes=express.Router()


WishListRoutes.route("/")
.patch(protectRoutes,allowTo("User"),validation(wishlistSchema),addToWishlist)
.delete(protectRoutes,allowTo("User"),validation(wishlistSchema),removeFromWishlist)
.get(protectRoutes,allowTo("User","Admin"),getAllWishlist)

export default WishListRoutes