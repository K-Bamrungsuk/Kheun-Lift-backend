import createError from "http-errors";

import { findUserById } from "../services/user.service.js";
import { verifyToken } from "../utilities/jwt.js";

async function authCheck(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return next(createError(401, "Unauthorized Access"));
  }

  const token = authorization.split(" ")[1];

  let payload;

  try {
    payload = verifyToken(token);
  } catch {
    return next(createError(401, "Invalid or expired token"));
  }

  const user = await findUserById(payload.id);

  if (!user) {
    return next(createError(401, "Unauthorized Access"));
  }

  req.user = user;
  next();
}

export default authCheck;
