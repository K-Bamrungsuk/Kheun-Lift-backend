import "dotenv/config";
import argon2 from "argon2";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed Exercises
  await prisma.exercise.createMany({
    data: [
      {
        name: "Bench Press",
        description: "Barbell bench press",
      },
      {
        name: "Squat",
        description: "Barbell back squat",
      },
      {
        name: "Deadlift",
        description: "Conventional deadlift",
      },
    ],
    skipDuplicates: true,
  });

  // Seed Weight Classes
  await prisma.weightClass.createMany({
    data: [
    {
      gender: "male",
      name: "59 kg",
      minWeight: 0,
      maxWeight: 59,
    },
    {
      gender: "male",
      name: "66 kg",
      minWeight: 59,
      maxWeight: 66,
    },
    {
      gender: "male",
      name: "74 kg",
      minWeight: 66,
      maxWeight: 74,
    },
    {
      gender: "male",
      name: "83 kg",
      minWeight: 74,
      maxWeight: 83,
    },
    {
      gender: "male",
      name: "93 kg",
      minWeight: 83,
      maxWeight: 93,
    },
    {
      gender: "male",
      name: "105 kg",
      minWeight: 93,
      maxWeight: 105,
    },
    {
      gender: "male",
      name: "120 kg",
      minWeight: 105,
      maxWeight: 120,
    },
    {
      gender: "male",
      name: "120+ kg",
      minWeight: 120,
      maxWeight: null,
    },
    ],
    skipDuplicates: true,
  });

  await prisma.weightClass.createMany({
    data: [
    {
      gender: "female",
      name: "47 kg",
      minWeight: 0,
      maxWeight: 47,
    },
    {
      gender: "female",
      name: "52 kg",
      minWeight: 47,
      maxWeight: 52,
    },
    {
      gender: "female",
      name: "57 kg",
      minWeight: 52,
      maxWeight: 57,
    },
    {
      gender: "female",
      name: "63 kg",
      minWeight: 57,
      maxWeight: 63,
    },
    {
      gender: "female",
      name: "69 kg",
      minWeight: 63,
      maxWeight: 69,
    },
    {
      gender: "female",
      name: "76 kg",
      minWeight: 69,
      maxWeight: 76,
    },
    {
      gender: "female",
      name: "84 kg",
      minWeight: 76,
      maxWeight: 84,
    },
    {
      gender: "female",
      name: "84+ kg",
      minWeight: 84,
      maxWeight: null,
    },
    ],
    skipDuplicates: true,
  });

  // Seed Users
  const password = await argon2.hash("password123");

  await prisma.user.deleteMany({
    where: {
      email: {
        in: [
          "anucha@example.com", "krit@example.com", "thanawat@example.com",
          "pimchanok@example.com", "sirinya@example.com", "nattaya@example.com",
        ],
      },
    },
  });

  // Seed presentation-ready rankings for every gender, weight class, and exercise.
  const [weightClasses, exercises] = await Promise.all([
    prisma.weightClass.findMany({ orderBy: { id: "asc" } }),
    prisma.exercise.findMany({ orderBy: { id: "asc" } }),
  ]);
  const names = {
    male: [
      "Bob", "Mark", "Jacob", "John", "Mike", "Alex", "Ben", "Chris",
      "Daniel", "Ethan", "Finn", "George", "Harry", "Isaac", "Jack", "Kevin",
      "Leo", "Max", "Noah", "Owen", "Paul", "Ryan", "Sam", "Tom",
    ],
    female: [
      "Anna", "Bella", "Chloe", "Daisy", "Emma", "Faith", "Grace", "Hannah",
      "Ivy", "Jade", "Kate", "Lily", "Mia", "Nora", "Olivia", "Paige",
      "Quinn", "Rose", "Sarah", "Tina", "Uma", "Vera", "Wendy", "Zoe",
    ],
  };
  const nameIndex = { male: 0, female: 0 };
  const demoUsers = [];

  for (const [classIndex, weightClass] of weightClasses.entries()) {
    for (let rank = 1; rank <= 3; rank++) {
      const classSlug = weightClass.name
        .toLowerCase()
        .replace("+", "-plus")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-$/, "");
      const slug = `${weightClass.gender}-${classSlug}-${rank}`;
      const index = nameIndex[weightClass.gender]++;
      const username = names[weightClass.gender][index];
      const email = `${username.toLowerCase()}@gmail.com`;
      const bodyWeight = weightClass.maxWeight
        ? Math.max(weightClass.minWeight + 0.5, weightClass.maxWeight - rank)
        : weightClass.minWeight + 6 - rank;
      await prisma.user.updateMany({
        where: { email: `${slug}@demo.kheunlift` },
        data: { email },
      });
      const user = await prisma.user.upsert({
        where: { email },
        update: { username, password, gender: weightClass.gender, bodyWeight },
        create: {
          username,
          email,
          password,
          gender: weightClass.gender,
          bodyWeight,
          height: weightClass.gender === "male" ? 170 + classIndex : 155 + classIndex,
          dateOfBirth: new Date(1995 + rank, classIndex % 12, rank * 4),
        },
      });

      demoUsers.push({ user, weightClass, bodyWeight, classIndex, rank });
    }
  }

  await prisma.liftRecord.deleteMany({
    where: { userId: { in: demoUsers.map(({ user }) => user.id) } },
  });
  await prisma.liftRecord.createMany({
    data: demoUsers.flatMap(({ user, weightClass, bodyWeight, rank }) =>
      exercises.map((exercise) => ({
        userId: user.id,
        exerciseId: exercise.id,
        weightClassId: weightClass.id,
        weight:
          Math.round(
            (bodyWeight *
              ({
                "Bench Press": weightClass.gender === "male" ? 1.5 : 1.1,
                Squat: weightClass.gender === "male" ? 1.9 : 1.55,
                Deadlift: weightClass.gender === "male" ? 2.25 : 1.9,
              }[exercise.name] -
                (rank - 1) * 0.08)) /
              2.5,
          ) * 2.5,
        reps: rank,
        caption: `Demo ${exercise.name} result for the ${weightClass.name} class`,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        status: "verified",
        createdAt: new Date(2026, 8, 20 + rank),
      })),
    ),
  });

  console.log("Seeded exercises, weight classes, users, and demo lift records");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
