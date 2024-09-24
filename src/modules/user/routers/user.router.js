import express from 'express'
import { addUser,deleteuser,updateuser,getuserById,getAlluser, changePassword } from '../controllers/user.controller.js'

const userRouters=express.Router()


userRouters.route("/")
.post(addUser)
.get(getAlluser)


userRouters.route("/:id")
.get(getuserById)
.patch(updateuser)
.delete(deleteuser)

userRouters.put("/changepassword/:id",changePassword)
export default userRouters