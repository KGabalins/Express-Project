const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");
const { requireAuth, authRole } = require("../middleware/authentication");

router
  .get("/", requireAuth, controller.getMyUser)
  .get("/:email", requireAuth, authRole("admin"), controller.getUser)
  .get("/perm/:email", controller.getPerm)
  .post("/", controller.addUser)
  .post("/login", controller.loginUser)
  .post("/:email", controller.updateUserEmail)
  .put("/:email", controller.updateUserPassword)
  .delete("/:email", controller.deleteUser);

module.exports = router;
