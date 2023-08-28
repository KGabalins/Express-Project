import Movie, { MovieCreationAttributes, MovieUpdateAttributes } from "../models/movie.model.js"
import db from "../config/postgres.js"

export const getAllMovies = async () => {
  await db.sync()

  const allMovies = await Movie.findAll()

  return allMovies
}

export const getMovieByName = async (movieName: string) => {
  await db.sync()

  const movie = await Movie.findOne({ where: { name: movieName } });

  return movie
}

export const createMovie = async (movieData: MovieCreationAttributes) => {
  await db.sync()

  console.log(movieData)

  const newMovie = await Movie.create(movieData)

  return newMovie
}

export const updateMovie = async (movieName: string, movieData: MovieUpdateAttributes): Promise<void> => {
  await db.sync()

  await Movie.update(movieData, { where: { name: movieName } })
}

export const deleteMovie = async (movieName: string): Promise<void> => {
  await Movie.destroy({ where: { name: movieName } })
}