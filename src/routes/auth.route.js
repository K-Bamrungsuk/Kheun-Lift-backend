import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.js'
import { loginSchema, registerSchema } from '../validations/schema.js'

const authRoute = express.Router()

authRoute.post('/register', validate({ body: registerSchema }), register)
authRoute.post('/login', validate({ body: loginSchema }), login)


export default authRoute
