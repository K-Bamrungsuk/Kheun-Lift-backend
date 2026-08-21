import express from "express";
import authCheck from "../middlewares/auth.middleware.js";
import { getWeightClasses } from "../controllers/weightClasses.controller.js";

const weightClassesRoute = express.Router();

weightClassesRoute.get("/", authCheck, getWeightClasses);

export default weightClassesRoute;
