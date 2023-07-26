const { UserPerm } = require("../models/userPerm");

const getMyPerm = async (req, res) => {
  // Get email from loged in user
  const { email } = req.user;

  try {
    const myPermission = await UserPerm.get(email);
    return res.status(200).json(myPermission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPerm = (req, res) => {};

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

module.exports = {
  getMyPerm,
  getPerm,
  updateUserPerm,
};
