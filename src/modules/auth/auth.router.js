import express from 'express'
import { signUp,SignIN } from './auth.controller.js'
import { validation } from '../../middleware/validation.js'
import { signInSchema, signUpValidationSchema } from './validations/auth.validation.js'



const authRouters=express.Router()


authRouters
.post('/signup',validation(signUpValidationSchema),signUp)
.post('/signin',validation(signInSchema),SignIN)



export default authRouters