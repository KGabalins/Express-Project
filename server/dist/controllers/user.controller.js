import User from "../models/user.model.js";
import UserPerm from "../models/userPerm.model.js";
import RentedMovie from "../models/rentedMovie.model.js";
import Session from "../models/session.model.js";
import bcrypt from "bcrypt";
import { signJWT } from "../utils/jwt.utils.js";
import dotenv from "dotenv";
import { validateEmailUpdate, } from "../utils/userValidation.js";
import { comparePassword, deleteUser, getUserData, registerUser } from "../service/user.service.js";
import { removeRentedMoviesByEmail } from "../service/rentedMovie.service.js";
dotenv.config();
// Get loged in user data
export const getMyUserHandler = (req, res) => {
    const { email, name, surname, role } = req.user;
    return res.status(200).json({ email, name, surname, role });
};
// Get information if user is logged in
export const getIsLoggedInHandler = (req, res) => {
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
                const sessionExists = await Session.findOne({
                    where: { email },
                });
                if (!sessionExists) {
                    try {
                        const session = await Session.create({
                            email: user.email,
                            name: user.name,
                            surname: user.surname,
                            role: user.role,
                        });
                        // Create access token
                        const accessToken = signJWT({
                            email: user.email,
                            name: user.name,
                            surname: user.surname,
                            role: user.role,
                            sessionId: session.sessionId,
                        }, "15m");
                        // Create refresh token
                        const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");
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
                        return res.send(session);
                    }
                    catch (error) {
                        return res.status(500).json({ message: error.message });
                    }
                }
                else {
                    if (!sessionExists.valid) {
                        await Session.update({ valid: true }, { where: { sessionId: sessionExists.sessionId } });
                        sessionExists.valid = true;
                    }
                    // Create access token
                    const accessToken = signJWT({
                        email: user.email,
                        name: user.name,
                        surname: user.surname,
                        role: user.role,
                        sessionId: sessionExists.sessionId,
                    }, "15m");
                    // Create refresh token
                    const refreshToken = signJWT({ sessionId: sessionExists.sessionId }, "1y");
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
                    return res.send(sessionExists);
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
export const updateUserEmailHandler = async (req, res) => {
    const oldEmail = req.user.email;
    const newEmail = req.body.email;
    const newReEmail = req.body.reemail;
    // Validate body data
    if (!validateEmailUpdate(newEmail, newReEmail)) {
        return res.status(422).json({ message: "Invalid input parameters!" });
    }
    try {
        // Check if email already exists
        const emailExists = await User.get(newEmail);
        if (emailExists) {
            return res.status(409).json({ message: "Email already exists" });
        }
        try {
            // Get old user data and change email
            const userData = await User.get(oldEmail);
            userData.email = newEmail;
            try {
                // Get old permissions and change email
                const userPerm = await UserPerm.get(oldEmail);
                userPerm.email = newEmail;
                try {
                    // Create new user
                    const newUser = await User.create(userData);
                    try {
                        // Create new permissions
                        const newUserPerm = await UserPerm.create(userPerm);
                        try {
                            // Delete old user
                            User.delete(oldEmail);
                            try {
                                // Delete old user permissions
                                UserPerm.delete(oldEmail);
                                try {
                                    // Update all rented movies renter email
                                    await RentedMovie.update({ renter: newEmail }, { where: { renter: oldEmail } });
                                    try {
                                        // Update all sessions email
                                        await Session.update({ email: newEmail }, { where: { email: oldEmail } });
                                        // Create updated access token
                                        const accessToken = signJWT({
                                            email: newUser.email,
                                            name: newUser.name,
                                            surname: newUser.surname,
                                            role: newUserPerm.role,
                                            sessionId: req.user.sessionId,
                                        }, "15m");
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
export const updateUserPasswordHandler = async (req, res) => {
    const currUserRole = req.user.role;
    const currUserEmail = req.user.email;
    const email = req.params.email;
    const { password, repassword } = req.body;
    // Validate body data
    if (!password && !repassword) {
        return res.status(422).json({ message: "Missing required fields!" });
    }
    else if (password.length < 8) {
        return res
            .status(422)
            .json({ message: "Password must be atleast 8 characters long!" });
    }
    else if (password !== repassword) {
        return res.status(422).json({ message: "Passwords must match!" });
    }
    try {
        // Check if user exists and validate user
        const user = await User.get(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        else if (currUserEmail !== email && currUserRole !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }
        // Hash entered password
        const hash = await bcrypt.hash(req.body.password, 11);
        try {
            // Update password in db
            await User.update({
                email,
                password: hash,
            });
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
    // Delete session from db
    try {
        await Session.update({ valid: false }, { where: { sessionId: req.user.sessionId } });
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
                    await Session.destroy({ where: { email: user.email } });
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
