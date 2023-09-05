import RentedMovie from "../models/rentedMovie.model.js";
import Session from "../models/session.model.js";
import User, { CreateUserData, UserAttributes, UserData } from "../models/user.model.js";
import UserPerm from "../models/userPerm.model.js";
import bcrypt from "bcrypt";

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

export const registerUser = async (userData: CreateUserData, role: "user" | "admin" = "user") => {
  await User.create(userData)
  await UserPerm.create({ email: userData.email, role })
}

export const updateUserPassword = async (newPasswordHashed: string, userEmail: string) => {
  await User.update({ email: userEmail, password: newPasswordHashed })
}
export const updateUserEmail = async (oldEmail: string, newEmail: string) => {
  const oldUserData = await getUserData(oldEmail)
  const { password } = await User.get(oldEmail)

  // @ts-ignore
  await registerUser({ email: newEmail, name: oldUserData.name, surname: oldUserData.surname, password }, oldUserData?.role)

  await deleteUser(oldEmail)

  await RentedMovie.update({ renter: newEmail }, { where: { renter: oldEmail } })

  await Session.update({ email: newEmail }, { where: { email: oldEmail } })

}


export const deleteUser = async (userEmail: string) => {
  await User.delete(userEmail)
  await UserPerm.delete(userEmail)
}

export const comparePassword = async (enteredPassword: string, userEmail: string): Promise<boolean> => {
  const { password } = await User.get(userEmail)

  const isValidPassword = await bcrypt.compare(enteredPassword, password)

  return isValidPassword
}