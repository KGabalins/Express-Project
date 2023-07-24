const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");
const { requireUser } = require("../middleware/requireUser");
const { requireAdmin } = require("../middleware/requireAdmin");

// CRUD routes
router
  .get("/", controller.getMovies)
  .get("/:name", requireUser, controller.getMovieByName)
  .post("/", requireUser, requireAdmin, controller.addMovie)
  .put("/:name", requireUser, controller.updateMovie)
  .delete("/:name", requireUser, requireAdmin, controller.deleteMovie);

module.exports = router;
