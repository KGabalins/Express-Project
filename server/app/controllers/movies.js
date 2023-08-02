const { Movie } = require("../models/movies");

// Get all movies
const getMovies = async (req, res) => {
  try {
    // Get all movies from db
    const movies = await Movie.findAll();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMovieByName = async (req, res) => {
  try {
    // Check if movie exists
    const movie = await Movie.findOne({ where: { name: req.params.name } });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addMovie = async (req, res) => {
  // Validate request parameters
  if (
    !req.body.name ||
    !req.body.genre ||
    !req.body.price ||
    (!req.body.stock && req.body.stock !== 0) ||
    !Number.isInteger(req.body.stock) ||
    !Number.isFinite(req.body.price)
  ) {
    return res.status(422).json({ message: "Invalid request body!" });
  }

  try {
    // Check if movie already exists
    const movieExists = await Movie.findOne({ where: { name: req.body.name } });
    if (movieExists) {
      return res.status(400).json({ message: "Movie already exists" });
    }
    try {
      // Create new movie
      const movie = await Movie.create(req.body);
      return res.status(201).json(movie);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  const name = req.params.name;
  const { price, stock } = req.body;
  // Validate request parameters
  if (!price || !stock || !Number.isInteger(stock) || !Number.isFinite(price)) {
    return res.status(422).json({ message: "Invalid request body!" });
  }
  try {
    // Check if movie exists
    const movieExists = await Movie.findOne({ where: { name } });
    if (!movieExists) {
      return res.status(404).json({ message: "Movie not found" });
    }
    try {
      // Update movie price and stock
      await Movie.update({ price, stock }, { where: { name } });
      return res.status(200).json({ message: "Movie updated" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    // Check if movie exists
    const movie = await Movie.findOne({ where: { name: req.params.name } });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    try {
      // Delete movie
      await Movie.destroy({ where: { name: req.params.name } });
      return res.status(200).json({ message: "Movie deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMovies,
  getMovieByName,
  addMovie,
  updateMovie,
  deleteMovie,
};
