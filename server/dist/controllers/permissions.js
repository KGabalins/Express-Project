import UserPerm from "../models/userPerm.model.js";
export const updateUserPerm = async (req, res) => {
    const email = req.params.email;
    const role = req.body.role;
    // Validate body data
    if (Object.keys(req.body)[0] !== "role") {
        return res.status(422).json({ message: "Invalid body data!" });
    }
    else if (req.body.role !== "admin" || req.body.role !== "user") {
        return res.status(422).json({ message: "Invalid role!" });
    }
    try {
        // Check if user exists
        const userPerm = await UserPerm.get(email);
        if (!userPerm) {
            return res.status(404).json({ message: "User not found" });
        }
        try {
            // Update user permission
            await UserPerm.update({ email, role });
            return res.status(200).json("Permissions updated");
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
