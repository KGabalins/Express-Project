import User, { CreateUserData, UserAttributes, UserData } from "../models/user.model.js";
import UserPerm from "../models/userPerm.model.js";
import bcrypt from "bcrypt";
import Session from "../models/session.model.js";

export const getUserData = async (userEmail: string): Promise<UserData | null> => {
  const userData = await User.get(userEmail)

  if (!userData) {
    return null
  }

  const { email, name, surname } = userData
  const userPerm = await UserPerm.get(userEmail)

  const fullUserData = {
    name,
    surname,
    email,
    role: userPerm.role,
  }

  return fullUserData
}

export const comparePassword = async (enteredPassword: string, userEmail: string): Promise<boolean> => {
  const { password } = await User.get(userEmail)

  const validPassword = await bcrypt.compare(enteredPassword, password)

  return validPassword
}

export const registerUser = async (userData: CreateUserData) => {
  await User.create(userData)
  await UserPerm.create({ email: userData.email, role: "user" })
}

export const deleteUser = async (userEmail: string) => {
  await User.delete(userEmail)
  await UserPerm.delete(userEmail)
}