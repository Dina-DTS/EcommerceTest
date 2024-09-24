

import express from 'express'
import { addReview, deleteReview, getAllReviews, getreviewById, updateReview } from '../controllers/review.controller.js'
import { protectRoutes } from '../../auth/auth.controller.js'


const ReviewRouters=express.Router()

ReviewRouters.route('/')
.post(protectRoutes,addReview)
.get(getAllReviews)

ReviewRouters.route('/:id')
.patch(protectRoutes,updateReview)
.get(getreviewById)
.delete(deleteReview)



export default ReviewRouters