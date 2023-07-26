const express = require("express");
const router = express.Router();
const controller = require("../controllers/permissions");
const { requireUser } = require("../middleware/requireUser");

router
  .get("/", requireUser, controller.getMyPerm)
  .get("/:email", requireUser, controller.getPerm)
  .put("/:email", requireUser, controller.updateUserPerm)

module.exports = router;
