import {
  deleteUserServie,
  editUserService,
  findUserWeightClass,
} from "../services/user.service.js";
import { editUserSchema } from "../validations/schema.js";

export async function getMe(req, res, next) {
  try {
    const {
      id,
      username,
      email,
      profileImage,
      gender,
      dateOfBirth,
      height,
      bodyWeight,
    } = req.user;

    const weightClass = await findUserWeightClass(gender, bodyWeight);

    res.status(200).json({
      id,
      username,
      email,
      profileImage,
      dateOfBirth,
      gender,
      height,
      bodyWeight,
      weightClass,
    });
  } catch (err) {
    next(err);
  }
}

export async function editMe(req, res, next) {
  try {
    const data = editUserSchema.parse(req.body);

    const updatedUser = await editUserService(req.user.id, data);

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
        gender: updatedUser.gender,
        dateOfBirth: updatedUser.dateOfBirth,
        height: updatedUser.height,
        bodyWeight: updatedUser.bodyWeight,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await deleteUserServie(req.user.id);
    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}
