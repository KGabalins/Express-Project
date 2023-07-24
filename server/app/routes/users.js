const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const { requireUser } = require("../middleware/requireUser");

router
  .get("/", requireUser, controller.getMyUser)
  .get("/:email", requireUser, controller.getUser)
  .get("/perm/:email", requireUser, controller.getPerm)
  .post("/", controller.addUser)
  .post("/login", controller.loginUser)
  .post("/token", controller.refreshToken)
  .put("/perm/:email", requireUser, controller.updateUserPerm)
  .put("/", requireUser, controller.updateUserEmail)
  .put("/:email", requireUser, controller.updateUserPassword)
  .delete("/logout", requireUser, controller.logoutUser)
  .delete("/:email", requireUser, controller.deleteUser);

module.exports = router;
