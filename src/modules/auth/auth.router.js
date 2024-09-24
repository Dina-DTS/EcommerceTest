import express from 'express'
import { signUp,SignIN } from './auth.controller.js'



const authRouters=express.Router()


authRouters
.post('/signup',signUp)
.post('/signin',SignIN)



export default authRouters