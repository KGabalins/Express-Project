const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");

// CRUD routes
router
  .get("/", controller.getMovies)
  .get("/:name", controller.getMovieByName)
  .post("/", controller.addMovie)
  .put("/:name", controller.updateMovie)
  .delete("/:name", controller.deleteMovie);

module.exports = router;
