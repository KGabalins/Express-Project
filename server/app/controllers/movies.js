const { Movie } = require("../models/movies");

// Get all movies
const getMovies = (req, res) => {
  Movie.findAll()
    .then((movies) => {
      return res.status(200).send(movies);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

const getMovieByName = (req, res) => {
  Movie.findOne({ where: { name: req.params.name } })
    .then((movie) => {
      console.log(movie);
      if (!movie) {
        return res.status(404).send("Movie not found");
      } else {
        return res.status(200).send(movie);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });
};

const addMovie = (req, res) => {
  Movie.create(req.body)
    .then((movie) => {
      return res.status(201).send(movie);
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(422);
    });
};

const updateMovie = (req, res) => {
  const key = Object.keys(req.body)[0];

  if (key !== "stock") {
    return res.sendStatus(422);
  }

  Movie.findOne({ where: { name: req.params.name } }).then((movie) => {
    if (!movie) {
      return res.status(404).send("Movie not found");
    } else {
      Movie.update(
        { stock: req.body.stock },
        { where: { name: req.params.name } }
      )
        .then(() => {
          return res.status(200).send("Movie stock updated!");
        })
        .catch((err) => {
          console.log(err);
          return res.sendStatus(400);
        });
    }
  });
};

const deleteMovie = (req, res) => {
  Movie.findOne({ where: { name: req.params.name } }).then((movie) => {
    if (!movie) {
      return res.status(404).send("Movie not found");
    } else {
      Movie.destroy({ where: { name: req.params.name } })
        .then(() => {
          return res.status(200).send("Movie deleted!");
        })
        .catch((err) => {
          console.log(err);
          return res.sendStatus(400);
        });
    }
  });
};

module.exports = {
  getMovies,
  getMovieByName,
  addMovie,
  updateMovie,
  deleteMovie,
};
