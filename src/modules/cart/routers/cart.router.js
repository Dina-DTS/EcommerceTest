

import express from 'express'
import { protectRoutes } from '../../auth/auth.controller.js'
import { addCart, applyCoupon, deletecart, getcart, getcartById, removeCartItem, updatecart } from '../controllers/cart.controller.js'


const CartRouters=express.Router()

CartRouters.route('/')
.post(protectRoutes,addCart)
.get(protectRoutes,getcart)

CartRouters.route('/:id')

.put(protectRoutes,updatecart)
.get(protectRoutes,getcartById)
.delete(protectRoutes,removeCartItem)
.delete(protectRoutes,deletecart)

CartRouters.route('/:code')
.post(protectRoutes,applyCoupon)

export default CartRouters