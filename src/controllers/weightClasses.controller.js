import { getWeightClassesService } from "../services/weightClasses.service.js";

export async function getWeightClasses(req, res, next) {
  try {
    const { gender } = req.valid.query;

    const weightClasses = await getWeightClassesService(gender);

    res.status(200).json({
      message: "Get weight classes successfully",
      data: weightClasses,
    });
  } catch (err) {
    next(err);
  }
}
