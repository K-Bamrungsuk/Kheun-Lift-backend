import createError from 'http-errors'
import { deleteUserServie, editUserService } from "../services/user.service.js";
import { editUserSchema } from '../validations/schema.js';

export function getMe(req, res) {
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
  res.status(200).json({
      id,
      username,
      email,
      profileImage,
      dateOfBirth,
      gender,
      height,
      bodyWeight,
    });
}


export async function editMe(req, res, next) {
  try {
    const data = editUserSchema.parse(req.body);

    const updatedUser = await editUserService(
      req.user.id,
      data
    );

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
    await deleteUserServie(req.user.id)
    res.status(200).json({
      message: "Account deleted successfully"
    })
    
  }catch (err){
    next(err)
  }
}