import express from 'express'
import { addToAddress, getAlladdresses, removeFromAddresses } from '../controller/address.controller.js'
import { protectRoutes } from '../../auth/auth.controller.js'

const addressRouters=express.Router()


addressRouters.route("/")
.patch(protectRoutes,addToAddress)
.delete(protectRoutes,removeFromAddresses)
.get(protectRoutes,getAlladdresses)

export default addressRouters