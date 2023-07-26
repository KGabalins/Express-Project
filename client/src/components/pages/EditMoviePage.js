import axios from "axios";
import EditMovieItem from "../items/EditMovieItem";
import { useEffect, useState } from "react";

const EditMoviePage = () => {
  const [availableMovies, setAvailableMovies] = useState([{}]);

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
      .catch((error) => {
        console.log(error.message);
      });
  }

  function deleteMovieHandler(selectedMovie) {
    axios.delete(`/movies/${selectedMovie.name}`).then(() => {
      renderMovies();
    }).catch((error) => {
      console.log(error.message);
    })
  }

  function editMovieHandler(editedMovie) {
    axios
      .put("/movies/", editedMovie)
      .then(
        renderMovies()
      )
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <EditMovieItem
        movies={availableMovies}
        onDeleteMovie={deleteMovieHandler}
        onEditMovie={editMovieHandler}
      />
    </>
  );
};

export default EditMoviePage;
