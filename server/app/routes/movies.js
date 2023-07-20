const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");
const { requireAuth } = require("../middleware/authentication");

// CRUD routes
router
  .get("/", requireAuth, controller.getMovies)
  .get("/:name", requireAuth, controller.getMovieByName)
  .post("/", requireAuth, controller.addMovie)
  .put("/:name", requireAuth, controller.updateMovie)
  .delete("/:name", requireAuth, controller.deleteMovie);

module.exports = router;
