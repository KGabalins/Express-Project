const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const { requireAuth, authRole } = require("../middleware/authentication");

router
  .get("/", requireAuth, controller.getMyUser)
  .get("/:email", requireAuth, controller.getUser)
  .get("/perm/:email", requireAuth, controller.getPerm)
  .post("/", controller.addUser)
  .post("/login", controller.loginUser)
  .put("/perm/:email", requireAuth, controller.updateUserPerm)
  .put("/", requireAuth, controller.updateUserEmail)
  .put("/:email", requireAuth, controller.updateUserPassword)
  .delete("/:email", requireAuth, controller.deleteUser);

module.exports = router;
