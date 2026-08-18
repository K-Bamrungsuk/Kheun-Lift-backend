import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
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
}

// Seed Male Weight Class
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

// Seed Female Weight Class
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

console.log("Exercise and WeightClass seeded successfully");

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
