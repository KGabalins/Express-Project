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
      .catch(() => {});
  }

  function deleteMovieHandler(selectedMovie) {
    axios.delete(`/movies/${selectedMovie.name}`).then(() => {
      renderMovies();
    });
  }

  function editMovieHandler(editedMovie) {
    const { name, price, stock } = editedMovie;
    axios.put(`/movies/${name}`, { price, stock }).then(renderMovies());
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
