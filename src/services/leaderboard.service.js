import { prisma } from "../lib/prisma.js";
import createError from "http-errors";

//Get leaderboard
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
      throw createError(404, "Weight Class not found");
    }

    if (gender && weightClass.gender !== gender) {
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

  const userId = new Set();

  const bestRecords = leaderboards.filter((record) => {
    if (userId.has(record.userId)) {
      return false;
    }

    userId.add(record.userId);

    return true;
  });

  console.log('record', bestRecords.map((record, index) => ({
    ...record, 
    rank: index + 1
  })))
  return bestRecords.map((record, index) => ({
    ...record, 
    rank: index + 1
  }));
}

//Get leaderboard randomly
export async function getRandomLeaderboardService() {
  const availableLeaderboards = await prisma.liftRecord.groupBy({
    by: ["exerciseId", "weightClassId"],

    where: {
      status: "verified",
    },
  });

  // ไม่มี Leaderboard ที่มีข้อมูลเลย
  if (availableLeaderboards.length === 0) {
    return null;
  }

  const selected =
    availableLeaderboards[
      Math.floor(Math.random() * availableLeaderboards.length)
    ];

  const leaderboards = await getleaderboardsService({
    exerciseId: selected.exerciseId,
    weightClassId: selected.weightClassId,
  });

  // ป้องกันกรณีข้อมูลถูกลบระหว่าง query
  if (!leaderboards.length) {
    return null;
  }

  return {
    exerciseId: selected.exerciseId,
    weightClassId: selected.weightClassId,
    leaderboards,
  };
}
