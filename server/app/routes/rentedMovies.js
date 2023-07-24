const express = require("express");
const router = express.Router();
const controller = require("../controllers/rentedMovies");
const { requireUser } = require("../middleware/requireUser");

// CRUD routes
router
  .get("/:email", requireUser, controller.getMoviesByEmail)
  .get("/id/:id", requireUser, controller.getMovieById)
  .post("/:name", requireUser, controller.addMovie)
  .put("/id/:id", requireUser, controller.updateMovie)
  .delete("/id/:id", requireUser, controller.deleteMovie);

module.exports = router;
