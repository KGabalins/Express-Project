const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");
const { requireUser } = require("../middleware/requireUser");
const { requireAdmin } = require("../middleware/requireAdmin");

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
   *      201:
   *        description: Success - Movie has been created
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetMovieResponse"
   *      400:
   *        description: Bad request - Movie already exists
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbiden - User is not an admin
   *      422:
   *        description: Unprocessable Entity - Invalid request body
   */
  .post("/", requireUser, requireAdmin, controller.addMovie)
      /**
   * @openapi
   * /movies/{name}:
   *  put:
   *    tags:
   *    - Movies
   *    summary: Update movie's price and stock (requires admin privileges)
   *    parameters:
   *      - in: path
   *        name: name
   *        required: true
   *        schema: 
   *          type: string
   *        description: The name of the movie
   *    requestBody:
   *      required: true
   *      description: A JSON object containing price and stock
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/UpdateMovieInput"
   *    responses:
   *      200:
   *        description: Success - Price and stock of the movie have been updated
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbiden - User is not an admin
   *      404:
   *        description: Not found - Movie does not exist
   *      422:
   *        description: Unprocessable Entity - Invalid request body
   */
  .put("/:name", requireUser, requireAdmin, controller.updateMovie)
        /**
   * @openapi
   * /movies/{name}:
   *  delete:
   *    tags:
   *    - Movies
   *    summary: Delete a movie (requires admin privileges)
   *    parameters:
   *      - in: path
   *        name: name
   *        required: true
   *        schema: 
   *          type: string
   *        description: The name of the movie
   *    responses:
   *      200:
   *        description: Success - Movie deleted successfully
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbiden - User is not an admin
   *      404:
   *        description: Not found - Movie does not exist
   */
  .delete("/:name", requireUser, requireAdmin, controller.deleteMovie);

module.exports = router;
