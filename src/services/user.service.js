import { prisma } from "../lib/prisma.js";
import argon2 from "argon2";

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: { email: email },
  });
  return user;
};

export const findUserById = async (id) => {
  const user = await prisma.user.findFirst({
    where: { id: id },
  });
  return user;
};

export async function findUserWeightClass(gender, bodyWeight) {
  if (!gender || bodyWeight == null) {
    return null;
  }

  return prisma.weightClass.findFirst({
    where: {
      gender,

      minWeight: {
        lt: bodyWeight,
      },

      OR: [
        {
          maxWeight: {
            gte: bodyWeight,
          },
        },
        {
          maxWeight: null,
        },
      ],
    },

    select: {
      id: true,
      name: true,
      gender: true,
      minWeight: true,
      maxWeight: true,
    },
  });
}

export const createUser = async (username, email, hashPassword) => {
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword,
    },
  });
  return newUser;
};

export const editUserService = async (id, data) => {
  const editData = { ...data };

  if (editData.password) {
    editData.password = await argon2.hash(editData.password);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: editData,
  });

  return updatedUser;
};

export async function deleteUserServie(userId) {
  return prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
