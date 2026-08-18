import { getAllExerciseServie, getExerciseByIdService } from "../services/exercise.service.js";

export async function getAllExercises(req, res, next) {
  try {
    const exercises = await getAllExerciseServie();

    res.status(200).json({
      exercises,
    });
  } catch (err) {
    next(err);
  }
}


export async function getExercisesById(req, res, next) {
  try {
    const { id } = req.params

    const exercise = await getExerciseByIdService(id)

    if(!exercise) {
      return res.status(400).json({
        message: "Exercise not Found"
      })
    }

    res.status(200).json({
      exercise
    })
    
  }catch(err){
    next(err)
  }
}