import express from 'express'
import { getLeaderboardsByExerciseId, getLeaderboardsByExerciseIdAndWeightClassId, getRandomLeaderboard } from '../controllers/leaderboards.controller.js'


const leaderboardsRoute = express.Router()

leaderboardsRoute.get('/exercises/:exerciseId', getLeaderboardsByExerciseId)
leaderboardsRoute.get('/exercises/:exerciseId/weight-classes/:weightClassId', getLeaderboardsByExerciseIdAndWeightClassId)
leaderboardsRoute.get('/random', getRandomLeaderboard)

export default leaderboardsRoute