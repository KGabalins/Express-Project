import { Request, Response } from "express";
import { createMovie, getAllMovies, getMovieByName, updateMovie, deleteMovie } from "../service/movie.service.js";
import { CreateMovieInput, UpdateMovieInput } from "../schema/movie.schema.js";

// Get all movies
export const getAllMoviesHandler = async (req: Request, res: Response) => {
  try {
    // Get all movies from db
    const movies = await getAllMovies();

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMovieByNameHandler = async (req: Request, res: Response) => {
  const movieName = req.params.name;
  try {
    // Check if movie exists
    const movie = await getMovieByName(movieName);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMovieHandler = async (req: Request<{}, {}, CreateMovieInput["body"]>, res: Response) => {
  const movieName = req.body.name

  try {
    // Check if movie already exists
    const movieExists = await getMovieByName(movieName);
    if (movieExists) {
      return res.status(409).json({ message: "Movie already exists" });
    }
    try {
      // Create new movie
      const movie = await createMovie(req.body)
      return res.status(201).json(movie);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMovieHandler = async (req: Request<UpdateMovieInput["params"], {}, UpdateMovieInput["body"]>, res: Response) => {
  const movieName = req.params.name;
  const movieData = req.body;

  try {
    // Check if movie exists
    const movieExists = await getMovieByName(movieName);

    if (!movieExists) {
      return res.status(404).json({ message: "Movie not found" });
    }
    
      try {
        // Update movie price and stock
        await updateMovie(movieName, movieData);

        return res.status(200).json({ message: "Movie updated" });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

export const deleteMovieHandler = async (req: Request, res: Response) => {
  const movieName = req.params.name;

  try {
    // Check if movie exists
    const movie = await getMovieByName(movieName);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    try {
      // Delete movie
      await deleteMovie(movieName);
      return res.status(200).json({ message: "Movie deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
