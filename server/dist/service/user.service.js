import User from "../models/user.model.js";
import UserPerm from "../models/userPerm.model.js";
import bcrypt from "bcrypt";
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
export const comparePassword = async (enteredPassword, userEmail) => {
    const { password } = await User.get(userEmail);
    const validPassword = await bcrypt.compare(enteredPassword, password);
    return validPassword;
};
export const registerUser = async (userData) => {
    await User.create(userData);
    await UserPerm.create({ email: userData.email, role: "user" });
};
export const deleteUser = async (userEmail) => {
    await User.delete(userEmail);
    await UserPerm.delete(userEmail);
};
