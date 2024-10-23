import express from 'express'
import { deleteuser,updateuser,getuserById,getAlluser, changePassword } from '../controllers/user.controller.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'

const userRouters=express.Router()


userRouters.route("/")
.get(protectRoutes,allowTo('Admin'),getAlluser)

userRouters.route("/:id")
.get( protectRoutes,allowTo("User","Admin"),getuserById)
.patch(protectRoutes,allowTo("User","Admin"),updateuser)
.delete(protectRoutes,allowTo("Admin"),deleteuser)

userRouters.put("/changepassword",protectRoutes,allowTo("User","Admin"),changePassword)
export default userRouters