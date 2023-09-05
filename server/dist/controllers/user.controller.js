import bcrypt from "bcrypt";
import { signAccessJWT, signRefreshJWT } from "../utils/jwt.utils.js";
import dotenv from "dotenv";
import { comparePassword, deleteUser, getUserData, registerUser, updateUserEmail, updateUserPassword } from "../service/user.service.js";
import { removeRentedMoviesByEmail } from "../service/rentedMovie.service.js";
import { createSession, removeSession } from "../service/session.service.js";
dotenv.config();
// Get loged in user data
export const getMyUserHandler = (req, res) => {
    // @ts-ignore
    const { email, name, surname, role } = req.user;
    return res.status(200).json({ email, name, surname, role });
};
// Get information if user is logged in
export const getIsLoggedInHandler = (req, res) => {
    // @ts-ignore
    if (!req.user) {
        return res.status(200).json({ isLoggedIn: false });
    }
    return res.status(200).json({ isLoggedIn: true });
};
// Get user data by email
export const getUserDataHandler = async (req, res) => {
    const email = req.params.email;
    try {
        // Get user data
        const userData = await getUserData(email);
        // Check if user exists
        if (!userData) {
            return res.status(404).json({ message: "User does not exist!" });
        }
        return res.status(200).json(userData);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const registerUserHandler = async (req, res) => {
    // Get data from request body
    const { email, name, surname, password } = req.body;
    const newUserData = {
        email,
        name,
        surname,
        password
    };
    try {
        // Check if user with this email already exists
        const userExists = await getUserData(email);
        if (userExists) {
            return res.status(409).json({ message: "User with this email already exists!" });
        }
        // Hash incoming password
        const hash = await bcrypt.hash(password, 11);
        newUserData.password = hash;
        try {
            // Register a new user
            await registerUser(newUserData);
            return res.status(201).json({ message: "User registration successful!" });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const loginUserHandler = async (req, res) => {
    // Get email and password from request body
    const { email, password } = req.body;
    try {
        // Check if user with this email exists
        const user = await getUserData(email);
        if (!user)
            return res.status(401).json({ message: "Invalid email or password" });
        try {
            // Check if entered password is correct
            const validPassword = await comparePassword(password, email);
            if (!validPassword)
                return res.status(401).json({ message: "Invalid email or password" });
            try {
                const session = await createSession(email);
                // Create access token
                const accessToken = await signAccessJWT(user.email, session.sessionId, "15m");
                // Create refresh token
                const refreshToken = signRefreshJWT(session.sessionId, "1y");
                // Set access token in cookie
                res.cookie("accessToken", accessToken, {
                    maxAge: 1.8e6,
                    httpOnly: true,
                });
                // Set refresh token cookie
                res.cookie("refreshToken", refreshToken, {
                    maxAge: 3.154e10,
                    httpOnly: true,
                });
                // Send user back
                return res.status(200).send(user);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const updateUserEmailHandler = async (req, res) => {
    // @ts-ignore
    const oldEmail = req.user.email;
    const { newEmail, password } = req.body;
    try {
        const isValidPassword = await comparePassword(password, oldEmail);
        if (!isValidPassword) {
            return res.status(403).send({ message: "Invalid password!" });
        }
        try {
            // Check if email already exists
            const emailExists = await getUserData(newEmail);
            if (emailExists) {
                return res.status(409).json({ message: "Email already exists" });
            }
            await updateUserEmail(oldEmail, newEmail);
            // Create updated access token
            // @ts-ignore
            const accessToken = await signAccessJWT(newEmail, req.user.sessionId, "15m");
            // Set updated access token in cookie
            res.cookie("accessToken", accessToken, {
                maxAge: 1.8e6,
                httpOnly: true,
            });
            return res.status(200).json({ message: "Email updated" });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const updateUserPasswordHandler = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    // @ts-ignore
    const { email } = req.user;
    try {
        // Check if old password is correct
        const validPassword = await comparePassword(oldPassword, email);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect old password!" });
        }
        // Hash entered password
        const hash = await bcrypt.hash(newPassword, 11);
        try {
            // Update user's password
            await updateUserPassword(hash, email);
            return res.status(200).json({ message: "Password updated" });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const logoutUserHandler = async (req, res) => {
    // @ts-ignore
    const { email } = req.user;
    // Delete access token cookie
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
    });
    // Delete refresh token cookie
    res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
    });
    try {
        // Delete session from db
        await removeSession(email);
        // Respond with success message
        return res.status(200).json({ message: "User logged out successfully!" });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
export const deleteUserHandler = async (req, res) => {
    const email = req.params.email;
    try {
        // Get user data
        const user = await getUserData(email);
        // Check if user exists and validate user
        if (!user) {
            return res.status(404).json({ message: "User not found" });
            // @ts-ignore
        }
        else if (user.email !== req.user.email && req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }
        try {
            // Delete all rented movies with this user
            await removeRentedMoviesByEmail(email);
            try {
                // Delete user
                await deleteUser(email);
                try {
                    await removeSession(email);
                    return res
                        .status(200)
                        .json({ message: "User deleted successfully!" });
                }
                catch (error) {
                    return res.status(500).json({ message: error.message });
                }
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
