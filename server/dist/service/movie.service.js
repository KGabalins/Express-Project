import Movie from "../models/movie.model.js";
import db from "../config/postgres.js";
export const getAllMovies = async () => {
    await db.sync();
    const allMovies = await Movie.findAll();
    return allMovies;
};
export const getMovieByName = async (movieName) => {
    await db.sync();
    const movie = await Movie.findOne({ where: { name: movieName } });
    return movie;
};
export const createMovie = async (movieData) => {
    await db.sync();
    console.log(movieData);
    const newMovie = await Movie.create(movieData);
    return newMovie;
};
export const updateMovie = async (movieName, movieData) => {
    await db.sync();
    await Movie.update(movieData, { where: { name: movieName } });
};
export const deleteMovie = async (movieName) => {
    await Movie.destroy({ where: { name: movieName } });
};
