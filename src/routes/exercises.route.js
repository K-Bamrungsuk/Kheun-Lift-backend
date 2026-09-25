import express from "express"
import { getAllExercises, getExercisesById } from "../controllers/exercise.controller.js"
import { validate } from "../middlewares/validate.js"
import { idParams } from "../validations/schema.js"

const exercisesRoute = express.Router()

exercisesRoute.get('/', getAllExercises)
exercisesRoute.get('/:id', validate({ params: idParams }), getExercisesById)

export default exercisesRoute
