import express from "express";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import usersRoute from "./routes/users.route.js";
import { pathNotFound } from "./middlewares/pathNotFound.middleware.js";
import errorHandler from "./middlewares/errorHandler.js";
import exercisesRoute from "./routes/exercises.route.js";
import liftRecordsRoute from "./routes/liftRecords.route.js";
import leaderboardsRoute from "./routes/leaderboards.route.js";
import weightClassesRoute from "./routes/weightClasses.route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/exercises", exercisesRoute);
app.use("/lifts", liftRecordsRoute);
app.use("/leaderboards", leaderboardsRoute);
app.use("/weight-classes", weightClassesRoute);

app.use(pathNotFound);
app.use(errorHandler);

export default app;
