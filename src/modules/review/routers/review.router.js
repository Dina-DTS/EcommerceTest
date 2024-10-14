

import express from 'express'
import { addReview, deleteReview, getAllReviews, getreviewById, updateReview } from '../controllers/review.controller.js'
import { allowTo, protectRoutes } from '../../auth/auth.controller.js'
import { addReviewShema, getReviewByIDSchema, updateReviewSchema } from '../validations/review.validation.js'
import { validation } from '../../../middleware/validation.js'


const ReviewRouters=express.Router()

ReviewRouters.route('/')
.post(protectRoutes,allowTo("User"),validation(addReviewShema),addReview)
.get(getAllReviews)

ReviewRouters.route('/:id')
.patch(protectRoutes,allowTo("User"),validation(updateReviewSchema),updateReview)
.get(validation(getReviewByIDSchema),getreviewById)
.delete(protectRoutes,deleteReview)


export default ReviewRouters