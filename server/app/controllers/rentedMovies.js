const { RentedMovie } = require("../models/rentedMovies");
const { Movie } = require("../models/movies");
const moviesController = require("../controllers/movies");

const getMyMovies = async (req, res) => {
  const { email } = req.user;

  try {
    const myMovies = await RentedMovie.findAll({ where: { renter: email } });
    return res.status(200).json(myMovies);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getMoviesByEmail = async (req, res) => {
  try {
    // Get rented movies by email
    const movies = await RentedMovie.findAll({
      where: { email: req.params.email },
    });
    // Validate user or check if user is admin
    if (req.params.email !== req.user.email && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to view these" });
      // Check if there are any rented movies
    } else if (!movies.length) {
      return res.status(404).json({ message: "No movies found" });
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    // Get rented movie by id
    const rentedMovie = await RentedMovie.findOne({
      where: { id: req.params.id },
    });
    // Check if rented movie exists and validate user or check if user is admin
    if (!rentedMovie) {
      return res.status(404).json({ message: "No movie found" });
    } else if (
      rentedMovie.renter !== req.user.email &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this" });
    }
    return res.status(200).json(rentedMovie);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const addMovie = async (req, res) => {
  try {
    // Check if movie exists and if stock is available
    const movie = await Movie.findOne({ where: { name: req.params.name } });
    if (!movie) {
      return res.status(404).json({ message: "No movie found" });
    } else if (movie.stock <= 0) {
      return res.status(422).json({ message: "Movie is out of stock" });
    }
    try {
      // Update movie stock
      await Movie.update(
        { stock: movie.stock - 1 },
        { where: { name: movie.name } }
      );
      try {
        // Create rented movie
        const rentedMovie = await RentedMovie.create({
          name: movie.name,
          genre: movie.genre,
          price: movie.price,
          renter: req.user.email,
        });
        return res.status(201).json(rentedMovie);
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  // Validate request parameters
  if (!req.body.time || !Number.isInteger(req.body.time)) {
    return res.status(422).json({ message: "No valid time in request!" });
  }

  try {
    // Check if rented movie exists
    const rentedMovie = await RentedMovie.findOne({
      where: { id: req.params.id },
    });
    if (!rentedMovie) {
      return res.status(404).json({ message: "No movie found" });
    }
    try {
      // Update rented movie time
      await RentedMovie.update(
        { time: req.body.time },
        { where: { id: req.params.id } }
      );
      return res.status(200).json({ message: "Movie time updated" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    // Check if rented movie exists
    const rentedMovie = await RentedMovie.findOne({
      where: { id: req.params.id },
    });
    if (!rentedMovie) {
      return res.status(404).json({ message: "No movie found" });
    } else if (rentedMovie.renter !== req.user.email && req.user.role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      // Delete rented movie
      await RentedMovie.destroy({ where: { id: req.params.id } });
      try {
        // Get movie by rented movie name
        const movie = await Movie.findOne({
          where: { name: rentedMovie.name },
        });
        console.log(movie)
        if(!movie) {
          return res.status(200).json({ message: "Movie deleted" });
        }
        try {
          // Update movie stock
          await Movie.update(
            { stock: movie.stock + 1 },
            { where: { name: movie.name } }
          );
          return res.status(200).json({ message: "Movie deleted" });
        } catch (error) {
          return res.status(500).send({ message: error.message });
        }
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getMyMovies,
  getMoviesByEmail,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
