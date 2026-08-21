import { prisma } from "../lib/prisma.js";


//Get WieghtClass by Gender
export async function getWeightClassesService(gender) {
  return prisma.weightClass.findMany({
    where: {
      gender,
    },
    orderBy: {
      minWeight: "asc",
    },
  });
}
