import RentedMovie, { RentedMovieCreationAttributes, RentedMovieUpdateAttributes } from "../models/rentedMovie.model.js";
import db from "../config/postgres.js";
import { UpdateRentedMovieTimeInput } from "../schema/rentedMovie.schema.js";

export const getRentedMoviesByEmail = async (userEmail: string) => {
  await db.sync()

  const rentedMovies = await RentedMovie.findAll({ where: { renter: userEmail } })

  return rentedMovies
}

export const getRentedMovieById = async (movieId: number) => {
  await db.sync()

  const rentedMovie = await RentedMovie.findOne({ where: { id: movieId } })

  return rentedMovie
}

export const addRentedMovie = async (rentedMovieData: RentedMovieCreationAttributes) => {
  await db.sync()

  const rentedMovie = await RentedMovie.create(rentedMovieData)

  return rentedMovie
}

export const updateRentedMovie = async (movieId: number, rentedMovieData: RentedMovieUpdateAttributes) => {
  await db.sync()

  await RentedMovie.update(rentedMovieData, { where: { id: movieId } })
}

export const removeRentedMovie = async (movieId: number) => {
  await db.sync()

  await RentedMovie.destroy({ where: { id: movieId } })
}

export const removeRentedMoviesByEmail = async (userEmail: string) => {
  await db.sync()

  await RentedMovie.destroy({ where: { renter: userEmail } });
}