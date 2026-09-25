import { getleaderboardsService, getRandomLeaderboardService } from "../services/leaderboard.service.js";

// Get Leaderboard by exercise id
export async function getLeaderboardsByExerciseId(req, res, next) {
  try {
    const { exerciseId } = req.valid.params;
    const { gender } = req.valid.query;

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
    const { exerciseId, weightClassId } = req.valid.params;
    // console.log('exerciseId', exerciseId)
    // console.log('weightClassId', weightClassId)

    const { gender } = req.valid.query;

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

//Get Leaderboard randomly by exercise and weight-class id
export async function getRandomLeaderboard(req, res, next) {
  try {
    const result = await getRandomLeaderboardService();

    res.status(200).json({
      message: result
        ? "Get random leaderboard successfully"
        : "No leaderboard available",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
