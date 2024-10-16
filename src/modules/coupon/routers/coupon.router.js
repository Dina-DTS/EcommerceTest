

import express from 'express'
import { addcoupon, deletecoupon, getAllcoupons, getcouponById, updatecoupon } from '../controllers/coupon.controller.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'
import { addcouponSchema, deleteCouponSchema, getCouponByIDSchema, updatecouponSchema } from '../validation/coupon.validation.js'
import { validation } from '../../../middleware/validation.js'



const couponRouters=express.Router()

couponRouters.route('/')
.post(protectRoutes,allowTo("Admin"),validation(addcouponSchema),addcoupon)
.get(protectRoutes,allowTo("Admin"),getAllcoupons)

couponRouters.route('/:id')
.patch(protectRoutes,allowTo("Admin"),validation(updatecouponSchema),updatecoupon)
.get(protectRoutes,allowTo("Admin"),validation(getCouponByIDSchema),getcouponById)
.delete(protectRoutes,allowTo("Admin"),validation(deleteCouponSchema),deletecoupon)

export default couponRouters