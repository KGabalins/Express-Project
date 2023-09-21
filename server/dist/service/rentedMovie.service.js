import RentedMovie from "../models/rentedMovie.model.js";
import db from "../config/postgres.js";
export const getRentedMoviesByEmail = async (userEmail) => {
    await db.sync();
    const rentedMovies = await RentedMovie.findAll({ where: { renter: userEmail } });
    return rentedMovies;
};
export const getRentedMovieById = async (movieId) => {
    await db.sync();
    const rentedMovie = await RentedMovie.findOne({ where: { id: movieId } });
    return rentedMovie;
};
export const addRentedMovie = async (rentedMovieData) => {
    await db.sync();
    const rentedMovie = await RentedMovie.create(rentedMovieData);
    return rentedMovie;
};
export const updateRentedMovie = async (movieId, rentedMovieData) => {
    await db.sync();
    await RentedMovie.update(rentedMovieData, { where: { id: movieId } });
};
export const removeRentedMovie = async (movieId) => {
    await db.sync();
    await RentedMovie.destroy({ where: { id: movieId } });
};
export const removeRentedMoviesByEmail = async (userEmail) => {
    await db.sync();
    await RentedMovie.destroy({ where: { renter: userEmail } });
};
