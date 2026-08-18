import express from 'express'
import { getLeaderboardsByExerciseId, getLeaderboardsByExerciseIdAndWeightClassId } from '../controllers/leaderboards.controller.js'


const leaderboardsRoute = express.Router()

leaderboardsRoute.get('/exercises/:exerciseId', getLeaderboardsByExerciseId)
leaderboardsRoute.get('/exercises/:exerciseId/weight-classes/:weightClassId', getLeaderboardsByExerciseIdAndWeightClassId)


export default leaderboardsRoute