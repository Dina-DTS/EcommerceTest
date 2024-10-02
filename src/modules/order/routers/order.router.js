

import express from 'express'
import { protectRoutes } from '../../auth/auth.controller.js'
import { addOrder, getAllOrders, getorder, getorderById, onlinePayment } from '../controllers/order.controller.js'


const OrderRouters=express.Router()

OrderRouters.route('/:id')
.post(protectRoutes,addOrder)
.get(protectRoutes,getorderById)


OrderRouters.route('/')
.get(protectRoutes,getAllOrders)
.get(protectRoutes,getorder)

OrderRouters.route('/checkout/:id')
.post(protectRoutes,onlinePayment)


export default OrderRouters