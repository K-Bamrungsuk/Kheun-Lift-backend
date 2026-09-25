import express from 'express'
import { getLeaderboardsByExerciseId, getLeaderboardsByExerciseIdAndWeightClassId, getRandomLeaderboard } from '../controllers/leaderboards.controller.js'
import { validate } from '../middlewares/validate.js'
import { leaderboardExerciseSchema, leaderboardExerciseWeightClassSchema, leaderboardGenderSchema } from '../validations/schema.js'


const leaderboardsRoute = express.Router()

leaderboardsRoute.get('/exercises/:exerciseId', validate({ params: leaderboardExerciseSchema, query: leaderboardGenderSchema }), getLeaderboardsByExerciseId)
leaderboardsRoute.get('/exercises/:exerciseId/weight-classes/:weightClassId', validate({ params: leaderboardExerciseWeightClassSchema, query: leaderboardGenderSchema }), getLeaderboardsByExerciseIdAndWeightClassId)
leaderboardsRoute.get('/random', getRandomLeaderboard)

export default leaderboardsRoute
