import express from "express";
import authCheck from "../middlewares/auth.middleware.js";
import { getWeightClasses } from "../controllers/weightClasses.controller.js";
import { validate } from "../middlewares/validate.js";
import { weightClassGenderSchema } from "../validations/schema.js";

const weightClassesRoute = express.Router();

weightClassesRoute.get("/", authCheck, validate({ query: weightClassGenderSchema }), getWeightClasses);

export default weightClassesRoute;
