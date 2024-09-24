

import express from 'express'
import { addcoupon, deletecoupon, getAllcoupons, getcouponById, updatecoupon } from '../controllers/coupon.controller.js'
import { protectRoutes } from '../../auth/auth.controller.js'



const couponRouters=express.Router()

couponRouters.route('/')
.post(protectRoutes,addcoupon)
.get(protectRoutes,getAllcoupons)

couponRouters.route('/:id')
.patch(protectRoutes,updatecoupon)
.get(protectRoutes,getcouponById)
.delete(protectRoutes,deletecoupon)



export default couponRouters