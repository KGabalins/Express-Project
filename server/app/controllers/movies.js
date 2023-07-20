const { Movie } = require("../models/movies");

// Get all movies
const getMovies = (req, res) => {
  Movie.findAll()
    .then((movies) => {
      if (!movies.length) {
        return res.status(404).json({ message: "No movies found" });
      } else {
        return res.status(200).json(movies);
      }
    })
    .catch((err) => {
      // console.log(err);
      return res.sendStatus(500);
    });
};

const getMovieByName = (req, res) => {
  Movie.findOne({ where: { name: req.params.name } })
    .then((movie) => {
      console.log(movie);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      } else {
        return res.status(200).json(movie);
      }
    })
    .catch((err) => {
      // console.log(err);
      return res.sendStatus(500);
    });
};

const addMovie = (req, res) => {
  Movie.findOne({ where: { name: req.body.name || "" } })
    .then((movie) => {
      if (movie) {
        return res.status(400).json({ message: "Movie already exists" });
      } else {
        Movie.create(req.body)
          .then((movie) => {
            return res.status(201).json(movie);
          })
          .catch((err) => {
            // console.log(err);
            return res.sendStatus(422);
          });
      }
    })
    .catch((err) => {
      // console.log(err);
      return res.sendStatus(500);
    });
};

const updateMovie = (req, res) => {
  const key = Object.keys(req.body)[0];

  if (key !== "stock") {
    return res.sendStatus(422);
  }

  Movie.findOne({ where: { name: req.params.name } })
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      } else {
        Movie.update(
          { stock: req.body.stock },
          { where: { name: req.params.name } }
        )
          .then(() => {
            return res.status(200).json({ message: "Movie stock updated!" });
          })
          .catch((err) => {
            // console.log(err);
            return res.sendStatus(422);
          });
      }
    })
    .catch((err) => {
      // console.log(err);
      return res.sendStatus(500);
    });
};

const deleteMovie = (req, res) => {
  Movie.findOne({ where: { name: req.params.name } })
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      } else {
        Movie.destroy({ where: { name: req.params.name } })
          .then(() => {
            return res.status(200).json({ message: "Movie deleted!" });
          })
          .catch((err) => {
            // console.log(err);
            return res.sendStatus(400);
          });
      }
    })
    .catch((err) => {
      // console.log(err);
      return res.sendStatus(500);
    });
};

module.exports = {
  getMovies,
  getMovieByName,
  addMovie,
  updateMovie,
  deleteMovie,
};
