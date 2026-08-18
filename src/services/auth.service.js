import argon2 from "argon2";
import createError from "http-errors";
import { createUser, findUserByEmail } from "./user.service.js";
import { createToken } from "../utilities/jwt.js";

export async function registerUser(username, email, password) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw createError(409, "This email is already registered.");
  }

  const hashPassword = await argon2.hash(password);

  const newUser = await createUser(username, email, hashPassword);
  return newUser;
}

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw createError(401, "invalid credentials");
  }

  const isMatch = await argon2.verify(user.password, password);
  if (!isMatch) {
    throw createError(401, "invalid credentials");
  }

  const token = await createToken({
    id: user.id,
    email: user.email,
  });

  return {
    token,
    user,
  };
}
