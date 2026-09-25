import { loginUser, registerUser } from "../services/auth.service.js";

export async function register(req, res, next) {
  const { username, email, password } = req.valid.body;

  const newUser = await registerUser(username, email, password);

  res.status(201).json({
    message: "Registration successful! Ready to smash your PR?",
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      profileImage: newUser.profileImage,
      bodyWeight: newUser.bodyWeight,
      height: newUser.height,
      gender: newUser.gender,
      dateOfBirth: newUser.dateOfBirth,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
  });
}

export async function login(req, res, next) {
  const { email, password } = req.valid.body;

  const { token, user } = await loginUser(email, password);

  res.status(200).json({
    message: "Welcome! Ready to update your PRs?",
    token: token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
}
