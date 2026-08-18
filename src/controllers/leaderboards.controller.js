import { getleaderboardsService } from "../services/leaderboard.service.js";
import {
  leaderboardExerciseSchema,
  leaderboardExerciseWeightClassSchema,
  leaderboardGenderSchema,
} from "../validations/schema.js";

// Get Leaderboard by exercise id
export async function getLeaderboardsByExerciseId(req, res, next) {
  try {
    const { exerciseId } = leaderboardExerciseSchema.parse({
      exerciseId: req.params.exerciseId,
    });

    const { gender } = leaderboardGenderSchema.parse(req.query);

    const leadeboards = await getleaderboardsService({
      exerciseId,
      gender,
    });

    res.json(leadeboards);
  } catch (err) {
    next(err);
  }
}

// Get Leaderboard by exercise and weight-class id
export async function getLeaderboardsByExerciseIdAndWeightClassId(
  req,
  res,
  next,
) {
  try {
    const { exerciseId, weightClassId } = leaderboardExerciseWeightClassSchema.parse(req.params);
    console.log('exerciseId', exerciseId)
    console.log('weightClassId', weightClassId)

    const { gender } = leaderboardGenderSchema.parse(req.query);

    const leadeboards = await getleaderboardsService({
      exerciseId,
      weightClassId,
      gender,
    });

    res.json(leadeboards);
  } catch (err) {
    next(err);
  }
}
