import {
  createLiftRecordsService,
  deleteLiftRecordService,
  getLiftRecordsByIdService,
  getMyLiftRecordsService,
  getUserAllLiftRecordsService,
  updateLiftRecordsService,
} from "../services/liftRecord.service.js";
import {
  createLiftRecordSchema,
  updatedLiftRecordSchema,
} from "../validations/schema.js";

// Create Lift Records
export async function createLiftRecord(req, res, next) {
  try {
    const data = createLiftRecordSchema.parse(req.body);

    const { exerciseId, weight, reps, performedAt, caption, videoUrl } = data;

    const userId = req.user.id;

    const liftRecord = await createLiftRecordsService(
      userId,
      exerciseId,
      weight,
      reps,
      performedAt,
      caption,
      videoUrl,
    );
    res.status(201).json({
      message: "Lift Record created successfully!",
      data: liftRecord,
    });
  } catch (err) {
    next(err);
  }
}

// Get all lift records
export async function getMyLiftRecords(req, res, next) {
  try {
    const userId = req.user.id;

    const liftRecords = await getMyLiftRecordsService(userId);

    res.status(200).json({
      message: "Get all lift records successfully",
      data: liftRecords,
    });
  } catch (err) {
    next(err);
  }
}

//Get Lift Record By Lift Record Id
export async function getLiftRecordsById(req, res, next) {
  try {
    const id = Number(req.params.id);

    const liftRecord = await getLiftRecordsByIdService(id);

    res.status(200).json({
      message: "Get lift record successfully",
      data: liftRecord,
    });
  } catch (err) {
    next(err);
  }
}

//Get All Lift Record By User Id
export async function getUserAllLiftRecords(req, res, next) {
  try {
    const userId = Number(req.params.id);

    const liftRecords = await getUserAllLiftRecordsService(userId);

    res.status(200).json({
      message: "Get user all lift records successfully",
      data: liftRecords,
    });
  } catch (err) {
    next(err);
  }
}

// Edit Lift Record by Id
export async function updateLiftRecordsById(req, res, next) {
  try {
    const id = Number(req.params.id);

    updatedLiftRecordSchema.parse(req.body);

    const liftRecord = await updateLiftRecordsService(
      id,
      req.user.id,
      req.body.caption,
    );

    res.status(200).json({
      message: "Update lift record successfully",
      data: liftRecord,
    });
  } catch (err) {
    next(err);
  }
}

// Delete Lift Record By Id
export async function deleteLiftRecord(req, res, next) {
  try {
    const id = Number(req.params.id);
    const user = req.user.id;

    await deleteLiftRecordService(id, user);

    res.status(200).json({
      message: "Delete lift record successfully",
    });
  } catch (err) {
    next(err);
  }
}
