import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import createError from "http-errors";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const prisma = new PrismaClient({ adapter });

// * Create Lift Records
export async function createLiftRecordsService(
  userId,
  exerciseId,
  weight,
  reps,
  caption,
  videoUrl,
) {
  //Find User
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw createError(404, "User Not Found!");
  }
  if (user.bodyWeight === null) {
    throw createError(400, "Body weight is required!");
  }
  if (!user.gender) {
    throw createError(400, "Gender is required!");
  }

  //Find Exercise
  const exercise = await prisma.exercise.findUnique({
    where: {
      id: exerciseId,
    },
  });
  if (!exercise) {
    throw createError(404, "Exercise Not Found!");
  }

  //Find WeightClass and then create Lift Record
  const weightClass = await prisma.weightClass.findFirst({
    where: {
      gender: user.gender,

      minWeight: {
        lt: user.bodyWeight,
      },

      OR: [
        {
          maxWeight: {
            gte: user.bodyWeight,
          },
        },
        {
          maxWeight: null,
        },
      ],
    },
  });

  if (!weightClass) {
    throw createError(404, "Weight Class Not Found!");
  }

  return prisma.liftRecord.create({
    data: {
      weight,
      reps,
      caption,
      videoUrl,
      status: "pending",

      user: {
        connect: {
          id: userId,
        },
      },

      exercise: {
        connect: {
          id: exerciseId,
        },
      },

      weightClass: {
        connect: {
          id: weightClass.id,
        },
      },
    },

    include: {
      user: {
        select: {
          username: true,
        },
      },
      exercise: {
        select: {
          name: true,
        },
      },
      weightClass: {
        select: {
          name: true,
          gender: true,
        },
      },
    },
  });
}

//Get My Lift Records
export async function getMyLiftRecordsService(userId) {
  return prisma.liftRecord.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      exercise: {
        select: {
          id: true,
          name: true,
        },
      },
      weightClass: {
        select: {
          id: true,
          name: true,
          gender: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

//Get Lift Records By Lift Record Id
export async function getLiftRecordsByIdService(id) {
  const liftRecord = await prisma.liftRecord.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      exercise: {
        select: {
          id: true,
          name: true,
        },
      },
      weightClass: {
        select: {
          id: true,
          name: true,
          gender: true,
        },
      },
    },
  });

  return liftRecord;
}

//Get All Lift Record By User Id
export async function getUserAllLiftRecordsService(userId) {
  const liftRecord = await prisma.liftRecord.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      exercise: {
        select: {
          id: true,
          name: true,
        },
      },
      weightClass: {
        select: {
          id: true,
          name: true,
          gender: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!liftRecord.length) {
    throw createError(404, "Lift record not found");
  }
  return liftRecord;
}

// Edit Lift Record by Id
export async function updateLiftRecordsService(id, userId, caption) {
  const liftRecord = await prisma.liftRecord.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!liftRecord) {
    throw createError(404, "Lift record not found");
  }

  return prisma.liftRecord.update({
    where: {
      id,
    },
    data: {
      caption,
    },
  });
}

// Delete Lift Record By Id
export async function deleteLiftRecordService(id, userId) {
  const liftRecord = await prisma.liftRecord.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!liftRecord) {
    throw createError(404, "Lift record not found");
  }

  return prisma.liftRecord.delete({
    where: {
      id,
    },
  });
}
