import express from 'express'
import { deleteUser, editMe, getMe } from '../controllers/users.controller.js'
import authCheck from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.js'
import { editUserSchema } from '../validations/schema.js'

const usersRoute = express.Router()

usersRoute.get('/me',authCheck ,getMe)

usersRoute.patch('/me', authCheck, validate({ body: editUserSchema }), editMe)

usersRoute.delete('/me', authCheck, deleteUser)

export default usersRoute
