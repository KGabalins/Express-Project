const express = require("express");
const router = express.Router();
const controller = require("../controllers/rentedMovies");
const { requireUser } = require("../middleware/requireUser");
const { requireAdmin } = require("../middleware/requireAdmin");

router
  /**
   * @openapi
   * /rentedMovies:
   *  get:
   *    tags:
   *    - Rented Movies
   *    summary: Get all current user rented movies
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetRentedMoviesResponse"
   *      401:
   *        description: Unauthorized - User is not logged in
   */
  .get("/", requireUser, controller.getMyMovies)
  /**
   * @openapi
   * /rentedMovies/{email}:
   *  get:
   *    tags:
   *    - Rented Movies
   *    summary: Get all rented movies by renter's email (requires admin privileges)
   *    parameters:
   *      - in: path
   *        required: true
   *        name: email
   *        schema:
   *          type: string
   *        description: Email of the rented movie's renter
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetRentedMoviesResponse"
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbiden - User is not an admin
   *      404:
   *        description: Not Found - User does not exist
   */
  .get("/:email", requireUser, requireAdmin, controller.getMoviesByEmail)
  /**
   * @openapi
   * /rentedMovies/id/{id}:
   *  get:
   *    tags:
   *    - Rented Movies
   *    summary: Get a rented movie by id (requires admin privileges)
   *    parameters:
   *      - in: path
   *        required: true
   *        name: id
   *        schema:
   *          type: integer
   *        description: Id of the rented movie
   *    responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetRentedMovieResponse"
   *      400:
   *        description: Bad Request - Invalid parameters
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbiden - User is not an admin
   *      404:
   *        description: Not Found - Movie does not exist
   */
  .get("/id/:id", requireUser, requireAdmin, controller.getMovieById)
  /**
   * @openapi
   * /rentedMovies/{name}:
   *  post:
   *    tags:
   *    - Rented Movies
   *    summary: Rent a movie
   *    parameters:
   *      - in: path
   *        required: true
   *        schema:
   *          type: string
   *        name: name
   *        description: Movie's name
   *    responses:
   *      201:
   *        description: Success - Movie has been rented
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/GetRentedMovieResponse"
   *      401:
   *        description: Unauthorized - User is not logged in
   *      404:
   *        description: Not Found - Movie does not exist
   *      409:
   *        description: Conflict - Movie is out of stock
   */
  .post("/:name", requireUser, controller.addMovie)
    /**
   * @openapi
   * /rentedMovies/id/{id}:
   *  put:
   *    tags:
   *    - Rented Movies
   *    summary: Update rented movie's time
   *    parameters:
   *      - in: path
   *        required: true
   *        schema:
   *          type: integer
   *        name: id
   *        description: Rented movie's id
   *    requestBody:
   *      required: true
   *      description: A JSON object containing method with values "+" or "-"
   *      content:
   *        application/json:
   *          schema:
   *            $ref: "#/components/schemas/UpdateRentedMovieTimeInput"
   *    responses:
   *      200:
   *        description: Success - Rented movie's time has been updated
   *      400:
   *        description: Bad Request - Invalid parameters
   *      401:
   *        description: Unauthorized - User is not logged in
   *      403:
   *        description: Forbiden - User isn't this movie's renter
   *      404:
   *        description: Not Found - Rented movie does not exist
   *      409:
   *        description: Conflict - Rented movie's time has reached either its maximum or minimum
   *      422:
   *        description: Unprocessable Entity - Invalid request body
   */
  .put("/id/:id", requireUser, controller.updateTime)
  
  .delete("/id/:id", requireUser, controller.deleteMovie);

module.exports = router;
