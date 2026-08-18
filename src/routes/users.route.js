import express from 'express'
import { deleteUser, editMe, getMe } from '../controllers/users.controller.js'
import authCheck from '../middlewares/auth.middleware.js'

const usersRoute = express.Router()

usersRoute.get('/me',authCheck ,getMe)

usersRoute.patch('/me', authCheck, editMe)

usersRoute.delete('/me', authCheck, deleteUser)

export default usersRoute