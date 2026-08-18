import express from "express"
import { getAllExercises, getExercisesById } from "../controllers/exercise.controller.js"

const exercisesRoute = express.Router()

exercisesRoute.get('/', getAllExercises)
exercisesRoute.get('/:id', getExercisesById)

export default exercisesRoute