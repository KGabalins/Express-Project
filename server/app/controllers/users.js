const { User, UserPerm } = require("../models/users");
const { Movie } = require("../models/movies");
const { RentedMovie } = require("../models/rentedMovies");
const { Session } = require("../models/sessions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signJWT } = require("../utils/jwt.utils");
require("dotenv").config();

const getMyUser = (req, res) => {
  console.log(req.user);
  return res.status(200).json(req.user);
};

const getUser = async (req, res) => {
  try {
    // Get user data
    const user = await User.get(req.params.email);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Validate user
    if (req.user.email !== req.params.email && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      // Get user permissions
      const userPerm = await UserPerm.get(req.params.email);
      return res.status(200).json({ user, userPerm });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPerm = (req, res) => {};

const addUser = async (req, res) => {
  // Validate body data
  if (
    req.body.email === undefined ||
    req.body.password === undefined ||
    req.body.name === undefined
  ) {
    return res.sendStatus(422);
  }
  // Hash incoming password
  const hash = await bcrypt.hash(req.body.password, 11);
  req.body.password = hash;

  try {
    // Check if user with this email already exists
    const userExists = await User.get(req.body.email);
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    try {
      // Add new user to database
      const user = await User.create(req.body);
      try {
        // Add user permissions
        await UserPerm.create({ email: user.email, role: "user" });
        return res.status(201).json(user);
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.get(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    try {
      const userPerm = await UserPerm.get(email);

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
            sessionId: session.sessionId,
            email: user.email,
            name: user.name,
            surname: user.surname,
            role: userPerm.role,
          },
          "5s"
        );
        // Create refresh token
        const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");

        // Set access token in cookie
        res.cookie("accessToken", accessToken, {
          maxAge: 60000, // 1 minutes
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
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  try {
    await Session.destroy({ where: { sessionId: req.user.sessionId } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

  return res.send({ message: "Logout successful" });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  try {
    const tokenExists = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!tokenExists) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: err.message });
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
          surname: user.surname,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );
      return res.status(200).json(token);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserPerm = async (req, res) => {
  // Validate body data
  if (Object.keys(req.body)[0] !== "role") {
    return res.sendStatus(422);
  }

  const email = req.params.email;
  const role = req.body.role;

  try {
    // Check if user permission exists and check if user is admin
    const userPerm = await UserPerm.get(email);
    if (!userPerm) {
      return res.status(404).json({ message: "User not found" });
    } else if (userPerm.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      // Update user permission
      await UserPerm.update({ email, role });
      return res.status(200).json("Permissions updated");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserEmail = async (req, res) => {
  // Validate body data
  if (Object.keys(req.body)[0] !== "email") {
    return res.sendStatus(422);
  }

  const oldEmail = req.user.email;
  const newEmail = req.body.email;

  try {
    // Check if email already exists
    const emailExists = await User.get(newEmail);
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
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
          await User.create(userData);
          try {
            // Create new permissions
            await UserPerm.create(userPerm);
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
};

const updateUserPassword = async (req, res) => {
  // Validate body data
  if (Object.keys(req.body)[0] !== "password") {
    return res.sendStatus(422);
  }
  try {
    // Check if user exists and validate user
    const user = User.get(req.params.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else if (
      req.user.email !== req.params.email &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // Hash entered password
    const hash = await bcrypt.hash(req.body.password, 11);
    try {
      // Update password in db
      await User.update({
        email: req.params.email,
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

const deleteUser = async (req, res) => {
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
      RentedMovie.destroy({ where: { renter: user.email } });
      try {
        // Delete user
        User.delete(user.email);
        try {
          // Delete user permissions
          UserPerm.delete(user.email);
          return res.status(200).json({ deletedUser: user });
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

module.exports = {
  getMyUser,
  getUser,
  getPerm,
  addUser,
  loginUser,
  logoutUser,
  refreshToken,
  updateUserPerm,
  updateUserEmail,
  updateUserPassword,
  deleteUser,
};
