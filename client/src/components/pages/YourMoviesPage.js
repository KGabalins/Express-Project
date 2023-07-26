import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./YourMoviesPage.module.css";
import YourMoviesList from "../lists/YourMoviesList";

const YourMoviesPage = () => {
  const [rentedMovies, setRentedMovies] = useState([]);

  useEffect(() => {
    renderRentedMovies();
  }, []);

  function renderRentedMovies() {
    axios
      .get("/rentedMovies/")
      .then((response) => {
        response.data.sort((a, b) => {
          return a.id - b.id;
        });
        setRentedMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function removeMovieHandler(removedMovieData) {
    axios
      .delete(`/rentedMovies/id/${removedMovieData.id}`)
      .then(() => renderRentedMovies())
      .catch((error) => console.log(error));
  }

  function changeTimeHandler(movie) {
    const timeMethod = movie.substr(movie.length - 1, movie.length);
    const rentedMovieId = movie.substr(0, movie.length - 1);

    axios.get(`/rentedMovies/id/${rentedMovieId}`).then((response) => {
      let currTime = Number.parseInt(response.data.time);
      if (currTime > 0 && timeMethod === "-") {
        currTime -= 12;
        axios
          .put(`/rentedMovies/id/${rentedMovieId}`, { time: currTime })
          .then(() => renderRentedMovies());
      } else if (currTime < 168 && timeMethod === "+") {
        currTime += 12;
        axios
          .put(`/rentedMovies/id/${rentedMovieId}`, { time: currTime })
          .then(() => renderRentedMovies());
      }
    });
  }

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Your movies</h2>
      {rentedMovies.length ? 
            <YourMoviesList
            movies={rentedMovies}
            onRemoveMovie={removeMovieHandler}
            onChangeTime={changeTimeHandler}
          />
          :
          <div>
            <p>You haven't rented any movie!</p>
          </div>
      }

    </div>
  );
};

export default YourMoviesPage;
