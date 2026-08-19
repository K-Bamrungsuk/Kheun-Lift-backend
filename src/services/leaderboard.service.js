import { prisma } from "../lib/prisma.js";
import createError from "http-errors";

export async function getleaderboardsService({
  exerciseId,
  weightClassId,
  gender,
}) {
  const where = {
    status: "verified",
  };

  // Exercise Validation
  if (exerciseId !== undefined) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });

    if (!exercise) {
      throw createError(404, "Exercise not found");
    }

    where.exerciseId = exerciseId;
  }

  // Weight Class Validation
  if (weightClassId !== undefined) {
    const weightClass = await prisma.weightClass.findUnique({
      where: {
        id: weightClassId,
      },
    });

    if (!weightClass) {
        throw createError(404, "Weight Class not found")
    }

    if (gender && weightClass.gender !==gender) {
      throw createError(404, "Weight class does not match gender");
    }

    where.weightClassId = weightClassId;
  }

  // Gender filter
  if (gender) {
    where.user = {
      gender,
    };
  }

  const leaderboards = await prisma.liftRecord.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          gender: true,
          bodyWeight: true,
        },
      },
      exercise: true,
      weightClass: true,
    },
    orderBy: [
      {
        weight: "desc",
      },
      {
        reps: "desc",
      },
      {
        createdAt: "asc",
      },
    ],
  });
  return leaderboards.map((record, index) => ({
    rank: index + 1,
    ...record,
  }));
}
