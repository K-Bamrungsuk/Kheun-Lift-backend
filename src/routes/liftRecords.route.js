import express from "express";
import authCheck from "../middlewares/auth.middleware.js";
import { createLiftRecord, deleteLiftRecord, getLiftRecordsById, getMyLiftRecords, getUserAllLiftRecords, updateLiftRecordsById } from "../controllers/liftRecords.controller.js";


const liftRecordsRoute = express.Router()

liftRecordsRoute.post('/', authCheck, createLiftRecord)

liftRecordsRoute.get('/me', authCheck, getMyLiftRecords)
liftRecordsRoute.get('/users/:id', authCheck, getUserAllLiftRecords)
liftRecordsRoute.get('/:id', authCheck, getLiftRecordsById)

liftRecordsRoute.patch('/:id', authCheck, updateLiftRecordsById)

liftRecordsRoute.delete('/:id', authCheck, deleteLiftRecord)

export default liftRecordsRoute