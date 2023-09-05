import RentedMovie from "../models/rentedMovie.model.js";
import Session from "../models/session.model.js";
import User from "../models/user.model.js";
import UserPerm from "../models/userPerm.model.js";
import bcrypt from "bcrypt";
import { removeSession } from "./session.service.js";
import { removeRentedMoviesByEmail } from "./rentedMovie.service.js";
export const getUserData = async (userEmail) => {
    const userData = await User.get(userEmail);
    if (!userData) {
        return null;
    }
    const { email, name, surname } = userData;
    const userPerm = await UserPerm.get(userEmail);
    const fullUserData = {
        name,
        surname,
        email,
        role: userPerm.role,
    };
    return fullUserData;
};
export const registerUser = async (userData, role = "user") => {
    await User.create(userData);
    await UserPerm.create({ email: userData.email, role });
};
export const updateUserPassword = async (newPasswordHashed, userEmail) => {
    await User.update({ email: userEmail, password: newPasswordHashed });
};
export const updateUserEmail = async (oldEmail, newEmail) => {
    const oldUserData = await getUserData(oldEmail);
    const { password } = await User.get(oldEmail);
    // @ts-ignore
    await registerUser({ email: newEmail, name: oldUserData.name, surname: oldUserData.surname, password }, oldUserData?.role);
    await deleteUser(oldEmail);
    await RentedMovie.update({ renter: newEmail }, { where: { renter: oldEmail } });
    await Session.update({ email: newEmail }, { where: { email: oldEmail } });
};
export const deleteUser = async (userEmail) => {
    await User.delete(userEmail);
    await UserPerm.delete(userEmail);
    await removeSession(userEmail);
    await removeRentedMoviesByEmail(userEmail);
};
export const comparePassword = async (enteredPassword, userEmail) => {
    const { password } = await User.get(userEmail);
    const isValidPassword = await bcrypt.compare(enteredPassword, password);
    return isValidPassword;
};
