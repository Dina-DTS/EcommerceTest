

import express from 'express'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'
import {  addCartWithUpdate, applyCoupon, deletecart, getcart, getcartById, removeCartItem } from '../controllers/cart.controller.js'
import { addcartSchema, removeCartItemSchema } from '../validations/cart.validation.js'
import { validation } from '../../../middleware/validation.js'


const CartRouters=express.Router()

CartRouters.route('/')
.post(protectRoutes,allowTo("User"),validation(addcartSchema),addCartWithUpdate)
.get(protectRoutes,allowTo("User"),getcart)

CartRouters.route('/:id')

// .put(protectRoutes,updatecart)
.get(protectRoutes,allowTo("Admin","User"),getcartById)
.patch(protectRoutes,allowTo("User"),validation(removeCartItemSchema),removeCartItem)
.delete(protectRoutes,allowTo("Admin"),validation(removeCartItemSchema),deletecart)

CartRouters.route('/:code')
.post(protectRoutes,allowTo("User"),applyCoupon)

export default CartRouters