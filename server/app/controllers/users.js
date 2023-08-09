import { User } from "../models/users.js";
import { UserPerm } from "../models/userPerm.js";
import { RentedMovie } from "../models/rentedMovies.js";
import { Session } from "../models/sessions.js";
import bcrypt from "bcrypt";
import { signJWT } from "../utils/jwt.utils.js";
import { validateEmail } from "../utils/validateEmail.js";
import dotenv from "dotenv";
import {
  validateEmailUpdate,
  validateRegistration,
} from "../utils/userValidation.js";
dotenv.config();

// Get loged in user data
export const getMyUser = (req, res) => {
  const { email, name, surname, role } = req.user;
  return res.status(200).json({ email, name, surname, role });
};

// Get information if user is logged in
export const getIsLoggedIn = (req, res) => {
  if (!req.user) {
    return res.status(200).json({ isLoggedIn: false });
  }
  return res.status(200).json({ isLoggedIn: true });
};

// Get user data by email
export const getUser = async (req, res) => {
  const email = req.params.email;
  try {
    // Get user data
    const user = await User.get(email);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }
    try {
      // Get user permissions
      const userPerm = await UserPerm.get(email);
      return res.status(200).json({
        email: user.email,
        name: user.name,
        surname: user.surname,
        role: userPerm.role,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  // Get data from request body
  const { email, reemail, password, repassword, name, surname } = req.body;
  const role = "user";
  // Validate body data
  if (
    !validateRegistration(email, reemail, name, surname, password, repassword)
  ) {
    return res.status(422).json({ message: "Invalid input parameters!" });
  }
  try {
    // Check if user with this email already exists
    const userExists = await User.get(req.body.email);
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Hash incoming password
    const hash = await bcrypt.hash(password, 11);
    req.body.password = hash;
    try {
      // Add new user to database
      const user = await User.create(req.body);
      try {
        // Add user permissions
        await UserPerm.create({ email, role });
        return res.status(201).json({ email, name, surname, role });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;
  // Validate request body data
  if (!email || !password)
    return res.status(422).json({ message: "Missing required fields!" });
  // Check if email and password are valid
  try {
    const user = await User.get(email);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).json({ message: "Invalid email or password" });
      try {
        const userPerm = await UserPerm.get(email);
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
                role: userPerm.role,
              });

              // Create access token
              const accessToken = signJWT(
                {
                  email: user.email,
                  name: user.name,
                  surname: user.surname,
                  role: userPerm.role,
                  sessionId: session.sessionId,
                },
                "15m"
              );
              // Create refresh token
              const refreshToken = signJWT(
                { sessionId: session.sessionId },
                "1y"
              );
              // Set access token in cookie
              res.cookie("accessToken", accessToken, {
                maxAge: 1.8e6, // 30 minutes
                httpOnly: true,
              });
              // Set refresh token cookie
              res.cookie("refreshToken", refreshToken, {
                maxAge: 3.154e10, //1 Year
                httpOnly: true,
              });
              // Send user back
              return res.send(session);
            } catch (error) {
              return res.status(500).json({ message: error.message });
            }
          } else {
            if (!sessionExists.valid) {
              await Session.update(
                { valid: true },
                { where: { sessionId: sessionExists.sessionId } }
              );
              sessionExists.valid = true;
            }
            // Create access token
            const accessToken = signJWT(
              {
                email: user.email,
                name: user.name,
                surname: user.surname,
                role: userPerm.role,
                sessionId: sessionExists.sessionId,
              },
              "15m"
            );
            // Create refresh token
            const refreshToken = signJWT(
              { sessionId: sessionExists.sessionId },
              "1y"
            );
            // Set access token in cookie
            res.cookie("accessToken", accessToken, {
              maxAge: 1.8e6, // 30 minutes
              httpOnly: true,
            });
            // Set refresh token cookie
            res.cookie("refreshToken", refreshToken, {
              maxAge: 3.154e10, //1 Year
              httpOnly: true,
            });
            return res.send(sessionExists);
          }
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserEmail = async (req, res) => {
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
                  await RentedMovie.update(
                    { renter: newEmail },
                    { where: { renter: oldEmail } }
                  );
                  try {
                    // Update all sessions email
                    await Session.update(
                      { email: newEmail },
                      { where: { email: oldEmail } }
                    );
                    // Create updated access token
                    const accessToken = signJWT(
                      {
                        email: newUser.email,
                        name: newUser.name,
                        surname: newUser.surname,
                        role: newUserPerm.role,
                        sessionId: req.user.sessionId,
                      },
                      "15m"
                    );
                    // Set updated access token in cookie
                    res.cookie("accessToken", accessToken, {
                      maxAge: 1.8e6, // 30 minutes
                      httpOnly: true,
                    });
                    return res.status(200).json({ message: "Email updated" });
                  } catch (error) {
                    return res.status(500).json({ message: error.message });
                  }
                } catch (error) {
                  return res.status(500).json({ message: error.message });
                }
              } catch (error) {
                return res.status(500).json({ message: error.message });
              }
            } catch (error) {
              return res.status(500).json({ message: error.message });
            }
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserPassword = async (req, res) => {
  const currUserRole = req.user.role;
  const currUserEmail = req.user.email;
  const email = req.params.email;
  const { password, repassword } = req.body;
  // Validate body data
  if (!password && !repassword) {
    return res.status(422).json({ message: "Missing required fields!" });
  } else if (password.length < 8) {
    return res
      .status(422)
      .json({ message: "Password must be atleast 8 characters long!" });
  } else if (password !== repassword) {
    return res.status(422).json({ message: "Passwords must match!" });
  }
  try {
    // Check if user exists and validate user
    const user = await User.get(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else if (currUserEmail !== email && currUserRole !== "admin") {
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
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
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
    await Session.update(
      { valid: false },
      { where: { sessionId: req.user.sessionId } }
    );
    // Respond with success message
    return res.status(200).json({ message: "User logged out successfully!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Get user data
    const user = await User.get(req.params.email);
    // Check if user exists and validate user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else if (user.email !== req.user.email && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      // Delete all rented movies with this user
      await RentedMovie.destroy({ where: { renter: user.email } });
      try {
        // Delete user
        await User.delete(user.email);
        try {
          // Delete user permissions
          await UserPerm.delete(user.email);
          try {
            await Session.destroy({ where: { email: user.email } });
            return res
              .status(200)
              .json({ message: "User deleted successfully!" });
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
