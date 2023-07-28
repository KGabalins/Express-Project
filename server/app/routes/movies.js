const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");
const { requireUser } = require("../middleware/requireUser");
const { requireAdmin } = require("../middleware/requireAdmin");

// CRUD routes
router
  /**
   * @openapi
   * /movies:
   *  get:
   *    tags:
   *    - Movies
   *    summary: Get all movies
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetMoviesResponse"
   *      401:
   *        description: Unauthorized - User is not logged in
   */
  .get("/", requireUser, controller.getMovies)
  /**
   * @openapi
   * /movies/{name}:
   *  get:
   *    tags:
   *    - Movies
   *    summary: Get a movie by name
   *    parameters:
   *      - in: path
   *        name: name
   *        required: true
   *        schema: 
   *          type: string
   *        description: The name of the movie
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetMovieResponse"
   *      401:
   *        description: Unauthorized - User is not logged in
   */
  .get("/:name", requireUser, controller.getMovieByName)
    /**
   * @openapi
   * /movies:
   *  post:
   *    tags:
   *    - Movies
   *    summary: Add a new movie (requires admin privileges)
   *    requestBody:
   *      required: true
   *      description: A JSON object containing name, genre, price and stock
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/CreateMovieInput"
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetMovieResponse"
   *      401:
   *        description: Unauthorized - User is not logged in
   */
  .post("/", requireUser, requireAdmin, controller.addMovie)
  .put("/", requireUser, requireAdmin, controller.updateMovie)
  .delete("/:name", requireUser, requireAdmin, controller.deleteMovie);

module.exports = router;
