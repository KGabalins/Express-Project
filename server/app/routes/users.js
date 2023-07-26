const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const { requireUser } = require("../middleware/requireUser");

router
  .get("/", requireUser, controller.getMyUser)
  .get("/:email", requireUser, controller.getUser)
  .post("/", controller.addUser)
  .post("/login", controller.loginUser)
  .post("/token", controller.refreshToken)
  .put("/", requireUser, controller.updateUserEmail)
  .put("/:email", requireUser, controller.updateUserPassword)
  .delete("/logout", requireUser, controller.logoutUser)
  .delete("/:email", requireUser, controller.deleteUser);

module.exports = router;
