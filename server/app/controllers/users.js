const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getMyUser = (req, res) => {
  User.get(req.user.email)
  .then((userData) => {
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userData);
  })
  .catch((err) => {
    return res.status(500).json({ message: err.message });
  });
}

const getUser = (req, res) => {
  User.get(req.params.email)
    .then((userData) => {
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(userData);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

const getPerm = (req, res) => {};

const addUser = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 11);
  req.body.password = hash;

  User.create(req.body)
    .then((userData) => {
      return res.status(201).json(userData);
    })
    .catch((err) => {
      if (err.code === "ECONNREFUSED") {
        return res
          .status(500)
          .json({ message: "Could not connect to database" });
      }
      return res.status(422).json({ message: err.message });
    });
};

const loginUser = async (req, res) => {
  User.get(req.body.email)
    .then((userData) => {
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      } else {
        bcrypt.compare(req.body.password, userData.password).then((result) => {
          console.log(result);
          if (result) {
            const token = jwt.sign(
              {
                email: userData.email,
                password: userData.password,
                name: userData.name,
                surname: userData.surname,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: 600,
              }
            );
            return res.status(200).json(token);
          } else {
            return res.status(401).json({ message: "Invalid password" });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

const updateUserEmail = (req, res) => {};

const updateUserPassword = (req, res) => {};

const deleteUser = (req, res) => {};

module.exports = {
  getMyUser,
  getUser,
  getPerm,
  addUser,
  loginUser,
  updateUserEmail,
  updateUserPassword,
  deleteUser,
};
