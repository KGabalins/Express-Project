const { RentedMovie } = require("../models/rentedMovies");
const { Movie } = require("../models/movies");

const getMoviesByEmail = (req, res) => {
  RentedMovie.findAll({
    where: {
      renter: req.params.email,
    },
  })
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

const getMovieById = (req, res) => {
  RentedMovie.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ message: "No movie found" });
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
  RentedMovie.create(req.body)
    .then((movie) => {
      res.status(201).json(movie);
    })
    .catch((err) => {
      // console.log(err);
      res.sendStatus(422);
    });
};

const updateMovie = (req, res) => {
  const key = Object.keys(req.body)[0];

  if (key !== "time") {
    return res.sendStatus(422);
  }

  RentedMovie.findOne({ where: { id: req.params.id } })
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ message: "No movie found" });
      } else {
        RentedMovie.update(
          { time: req.body.time },
          { where: { id: req.params.id } }
        )
          .then(() => {
            return res.status(200).json({ message: "Movie time updated" });
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
  RentedMovie.findOne({ where: { id: req.params.id } })
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ message: "No movie found" });
      } else {
        RentedMovie.destroy({ where: { id: req.params.id } })
          .then(() => {
            return res.status(200).json({ message: "Movie deleted" });
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
  getMoviesByEmail,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
