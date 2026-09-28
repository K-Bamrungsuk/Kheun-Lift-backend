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

  await prisma.user.updateMany({
    where: {
      OR: [
        { email: { endsWith: "@example.com" } },
        { email: { endsWith: "@demo.kheunlift" } },
      ],
    },
    data: { password },
  });

  await prisma.user.createMany({
    data: [
      {
        username: "anucha.s",
        email: "anucha@example.com",
        password,
        gender: "male",
        dateOfBirth: new Date("1998-04-12"),
        height: 175,
        bodyWeight: 72,
      },
      {
        username: "krit.power",
        email: "krit@example.com",
        password,
        gender: "male",
        dateOfBirth: new Date("1995-09-28"),
        height: 182,
        bodyWeight: 89,
      },
      {
        username: "thanawat.fit",
        email: "thanawat@example.com",
        password,
        gender: "male",
        dateOfBirth: new Date("2001-02-17"),
        height: 168,
        bodyWeight: 64,
      },
      {
        username: "pimchanok.lifts",
        email: "pimchanok@example.com",
        password,
        gender: "female",
        dateOfBirth: new Date("1999-07-06"),
        height: 162,
        bodyWeight: 55,
      },
      {
        username: "sirinya.strong",
        email: "sirinya@example.com",
        password,
        gender: "female",
        dateOfBirth: new Date("1997-11-21"),
        height: 168,
        bodyWeight: 63,
      },
      {
        username: "nattaya.fit",
        email: "nattaya@example.com",
        password,
        gender: "female",
        dateOfBirth: new Date("2002-01-30"),
        height: 158,
        bodyWeight: 47.5,
      },
    ],
    skipDuplicates: true,
  });

  // Seed presentation-ready rankings for every gender, weight class, and exercise.
  const [weightClasses, exercises] = await Promise.all([
    prisma.weightClass.findMany({ orderBy: { id: "asc" } }),
    prisma.exercise.findMany({ orderBy: { id: "asc" } }),
  ]);
  const names = {
    male: [
      "Bob Marley", "Freddie Mercury", "David Bowie", "Michael Jackson",
      "Elvis Presley", "John Lennon", "Paul McCartney", "George Harrison",
      "Ringo Starr", "Bruno Mars", "Ed Sheeran", "Elton John",
      "Stevie Wonder", "Prince Nelson", "Mick Jagger", "Bruce Lee",
      "Jackie Chan", "Tom Hanks", "Keanu Reeves", "Will Smith",
      "Chris Hemsworth", "Hugh Jackman", "Ryan Gosling", "Dwayne Johnson",
    ],
    female: [
      "Aretha Franklin", "Whitney Houston", "Tina Turner", "Diana Ross",
      "Dolly Parton", "Celine Dion", "Adele Adkins", "Beyonce Knowles",
      "Rihanna Fenty", "Taylor Swift", "Lady Gaga", "Katy Perry",
      "Shakira Mebarak", "Mariah Carey", "Alicia Keys", "Selena Gomez",
      "Emma Watson", "Sandra Bullock", "Julia Roberts", "Gal Gadot",
      "Serena Williams", "Simone Biles", "Naomi Osaka", "Ronda Rousey",
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
      const username = names[weightClass.gender][nameIndex[weightClass.gender]++];
      const email = `${username.toLowerCase().replaceAll(" ", "")}@gmail.com`;
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
