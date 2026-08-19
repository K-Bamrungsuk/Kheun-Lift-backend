import z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username must be at least 1 characters.")
    .max(20, "Username must be at most 20 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

export const editUserSchema = z.object({
  username: z
    .string()
    .min(1, "Username must be at least 1 characters.")
    .max(20, "Username must be at most 20 characters.")
    .optional(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .optional(),

  profileImage: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  dateOfBirth: z.coerce.date().optional(),
  height: z.coerce.number().positive().optional(),
  bodyWeight: z.coerce.number().positive().optional(),
});

export const createLiftRecordSchema = z.object({
  exerciseId: z.number().int().positive(),
  weight: z.number().positive(),
  reps: z.number().int().positive(),
  caption: z.string().optional(),
  videoUrl: z.url().optional(),
});

export const updatedLiftRecordSchema = z.object({
  caption: z.string().optional(),
});

export const leaderboardExerciseSchema = z.object({
  exerciseId: z.coerce.number().int().positive(),
});

export const leaderboardExerciseWeightClassSchema = z.object({
  exerciseId: z.coerce.number().int().positive(),
  weightClassId: z.coerce.number().int().positive(),
});

export const leaderboardGenderSchema = z.object({
  gender: z.enum(["male", "female"]).optional(),
});
