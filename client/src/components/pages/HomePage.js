/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AvailableMoviesList from "../lists/AvailableMoviesList";
import classes from "./HomePage.module.css";
import axios from "axios";

const HomePage = () => {
  const [availableMovies, setAvailableMovies] = useState([]);

  useEffect(() => {
    renderMovies();
  }, []);

  function renderMovies() {
    axios
      .get("/movies/")
      .then((response) => {
        response.data.sort((a, b) => {
          return a.id - b.id;
        });
        setAvailableMovies(response.data);
      })
      .catch(() => {});
  }

  function rentMovieHandler(rentedMovieData) {
    const movieName = rentedMovieData.name;

    axios
      .post(`/rentedMovies/${movieName}`)
      .then(() => {
        renderMovies();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Available Movies</h2>
      {availableMovies.length ? (
        <AvailableMoviesList
          movies={availableMovies}
          onRentMovie={rentMovieHandler}
        />
      ) : (
        <div>
          <p>No movies available</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
