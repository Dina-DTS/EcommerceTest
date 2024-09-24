import express from 'express'
import { addToWishlist, getAllWishlist, removeFromWishlist } from '../controller/wishlist.controller.js'
import { protectRoutes } from '../../auth/auth.controller.js'

const WishListRoutes=express.Router()


WishListRoutes.route("/")
.patch(protectRoutes,addToWishlist)
.delete(protectRoutes,removeFromWishlist)
.get(protectRoutes,getAllWishlist)

export default WishListRoutes