import express from 'express'
import { deleteuser,updateuser,getuserById,getAlluser, changePassword } from '../controllers/user.controller.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'
import { validation } from '../../../middleware/validation.js'
import { updateUserSchema, useridSchema } from '../validation/user.validation.js'

const userRouters=express.Router()


userRouters.route("/")
.get(protectRoutes,allowTo('Admin'),getAlluser)

userRouters.route("/:id")
.get( protectRoutes,allowTo("User","Admin"),validation(useridSchema),getuserById)
.patch(protectRoutes,allowTo("User","Admin"),validation(updateUserSchema),updateuser)
.delete(protectRoutes,allowTo("Admin"),validation(useridSchema),deleteuser)

userRouters.put("/changepassword",protectRoutes,allowTo("User","Admin"),changePassword)
export default userRouters