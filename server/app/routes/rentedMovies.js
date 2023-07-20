const express = require("express");
const router = express.Router();
const controller = require("../controllers/rentedMovies");
const { requireAuth } = require("../middleware/authentication");

// CRUD routes
router
  .get("/:email", requireAuth, controller.getMoviesByEmail)
  .get("/id/:id", requireAuth, controller.getMovieById)
  .post("/", requireAuth, controller.addMovie)
  .put("/id/:id", requireAuth, controller.updateMovie)
  .delete("/id/:id", requireAuth, controller.deleteMovie);

module.exports = router;
