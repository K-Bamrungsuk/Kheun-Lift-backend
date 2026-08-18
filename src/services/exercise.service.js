import { prisma } from "../lib/prisma.js";

export async function getAllExerciseServie() {
  return await prisma.exercise.findMany({
    orderBy: {
      id: "asc",
    },
  });
}


export async function getExerciseByIdService(id) {
  return await prisma.exercise.findUnique({
    where: {
      id: Number(id)
    },
  });
}

