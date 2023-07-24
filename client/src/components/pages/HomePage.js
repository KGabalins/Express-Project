/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AvailableMoviesList from "../lists/AvailableMoviesList";
import classes from "./HomePage.module.css";
import axios from "axios";

const HomePage = () => {
  const [availableMovies, setAvailableMovies] = useState([{}]);

  useEffect(() => {
    axios.get("/movies/").then((response) => {
      setAvailableMovies(response.data);
    }).catch((error) => {
      console.log(error.message)
    })
  }, []);

  // function getMovies() {
  //   axios
  //     .get("/movies")
  //     .then((response) => {
  //       console.log(response)
  //       setAvailableMovies(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // function rentMovieHandler(rentedMovieData) {
  //   axios
  //     .post(
  //       "/rentedMovies/",
  //       { name: rentedMovieData.name },
  //       {
  //         headers: { Authorization: token },
  //       }
  //     )
  //     .then(getMovies())
  //     .catch((error) => console.log(error));
  // }

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Available Movies</h2>
      <AvailableMoviesList
        movies={availableMovies}
        // onRentMovie={rentMovieHandler}
      />
    </div>
  );
};

export default HomePage;
