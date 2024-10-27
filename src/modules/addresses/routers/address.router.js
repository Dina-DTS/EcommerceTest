import express from 'express'
import { addToAddress, getAllAddresses, removeFromAddresses } from '../controller/address.controller.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'
import { validation } from '../../../middleware/validation.js'
import { addressSchema, removeaddressSchema } from '../validations/adresses.validation.js'

const addressRouters=express.Router()


addressRouters.route("/")
.patch(protectRoutes,allowTo("User","Admin"),validation(addressSchema),addToAddress)
.delete(protectRoutes,allowTo("User","Admin"),validation(removeaddressSchema),removeFromAddresses)
.get(protectRoutes,allowTo("User","Admin"),getAllAddresses)

export default addressRouters