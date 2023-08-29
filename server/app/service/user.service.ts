import User, { UserAttributes, UserData } from "../models/user.model.js";
import UserPerm from "../models/userPerm.model.js";
import Session from "../models/session.model.js";

export const getUserData = async (userEmail: string): Promise<UserData | null> => {
  const userData = await User.get(userEmail)

  if (!userData) {
    return null
  }

  // const { email, name, surname } = userData
  const userPerm = await UserPerm.get(userEmail)

  const fullUserData = {
    ...userData,
    role: userPerm.role,
  }

  return fullUserData
}

export const registerUser = async (userData: UserAttributes, role: "user" | "admin") => {
  await User.create(userData)
  await UserPerm.create({ email: userData.email, role })
}

export const deleteUser = async (userEmail: string) => {
  await User.delete(userEmail)
  await UserPerm.delete(userEmail)
}