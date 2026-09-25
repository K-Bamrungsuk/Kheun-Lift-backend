import express from "express";
import authCheck from "../middlewares/auth.middleware.js";
import { createLiftRecord, deleteLiftRecord, getLiftRecordsById, getMyLiftRecords, getUserAllLiftRecords, updateLiftRecordsById } from "../controllers/liftRecords.controller.js";
import { validate } from "../middlewares/validate.js";
import { createLiftRecordSchema, idParams, updatedLiftRecordSchema } from "../validations/schema.js";


const liftRecordsRoute = express.Router()

liftRecordsRoute.post('/', authCheck, validate({ body: createLiftRecordSchema }), createLiftRecord)

liftRecordsRoute.get('/me', authCheck, getMyLiftRecords)
liftRecordsRoute.get('/users/:id', authCheck, validate({ params: idParams }), getUserAllLiftRecords)
liftRecordsRoute.get('/:id', authCheck, validate({ params: idParams }), getLiftRecordsById)

liftRecordsRoute.patch('/:id', authCheck, validate({ params: idParams, body: updatedLiftRecordSchema }), updateLiftRecordsById)

liftRecordsRoute.delete('/:id', authCheck, validate({ params: idParams }), deleteLiftRecord)

export default liftRecordsRoute
