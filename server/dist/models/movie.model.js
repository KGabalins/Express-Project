import { DataTypes, Model } from "sequelize";
import db from "../config/postgres.js";
class Movie extends Model {
}
Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: "Movie",
    tableName: "movies"
});
export default Movie;
// export const Movie = db.define("movie", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   genre: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   stock: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });
// Swagger movie schemas
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
 *            description: Automatically generated id
 *          name:
 *            type: string
 *            description: Name of the movie
 *          genre:
 *            type: string
 *            description: Genre of the movie
 *          price:
 *            type: number
 *            description: Price of the movie
 *          stock:
 *            type: integer
 *            description: Stock of the movie
 *    GetMovieResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Automatically generated id
 *        name:
 *          type: string
 *          description: Name of the movie
 *        genre:
 *          type: string
 *          description: Genre of the movie
 *        price:
 *          type: number
 *          description: Price of the movie
 *        stock:
 *          type: integer
 *          description: Stock of the movie
 *    CreateMovieInput:
 *      type: object
 *      required:
 *        - name
 *        - genre
 *        - price
 *        - stock
 *      properties:
 *        name:
 *          type: string
 *          description: Name of the movie
 *        genre:
 *          type: string
 *          description: Genre of the movie
 *        price:
 *          type: number
 *          description: Price of the movie
 *        stock:
 *          type: integer
 *          description: Stock of the movie
 *    UpdateMovieInput:
 *      type: object
 *      required:
 *        - genre
 *        - price
 *        - stock
 *      properties:
 *        genre:
 *          type: string
 *          description: Genre of the movie
 *        price:
 *          type: number
 *          description: Price of the movie
 *        stock:
 *          type: integer
 *          description: Stock of the movie
 *
 */ 
