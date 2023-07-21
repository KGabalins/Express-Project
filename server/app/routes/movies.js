const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");
const { requireAuth, authRole } = require("../middleware/authentication");

// CRUD routes
router
  .get("/", requireAuth, controller.getMovies)
  .get("/:name", requireAuth, controller.getMovieByName)
  .post("/", requireAuth, authRole("admin"), controller.addMovie)
  .put("/:name", requireAuth, controller.updateMovie)
  .delete("/:name", requireAuth, authRole("admin"), controller.deleteMovie);

module.exports = router;
