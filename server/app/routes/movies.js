const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");
const { requireUser } = require("../middleware/requireUser");
const { requireAdmin } = require("../middleware/requireAdmin");

/**
 * @openapi
 * components:
 *  schemas:
 *    GetMoviesResponse:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: Automatically generated id from database
 *          name:
 *            type: string
 *            description: Name of the movie
 *          genre:
 *            type: string
 *            description: Genre of the movie
 *          price:
 *            type: string
 *            description: Price of the movie
 *          stock:
 *            type: integer
 *            description: Stock of the movie
 * 
 */

// CRUD routes
router
    /**
   * @openapi
   * /movies:
   *  get:
   *    tags:
   *    - Movies
   *    summary: Gets a list of all movies
   *    responses:
   *      201:
   *        description: Success
   *        content: 
   *          application/json: 
   *            schema:
   *              $ref: "#/components/schemas/GetMoviesResponse"
   *      403:
   *        description: Forbidden
   */       
  .get("/",requireUser, controller.getMovies)
  .get("/:name", requireUser, controller.getMovieByName)
  .post("/", requireUser, requireAdmin, controller.addMovie)
  .put("/", requireUser, requireAdmin, controller.updateMovie)
  .delete("/:name", requireUser, requireAdmin, controller.deleteMovie);

module.exports = router;
