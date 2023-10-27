import { useState, useEffect } from "react";
import { MovieType } from "../contexts/MovieContext";
import {
  deleteMovie,
  editMovie,
  selectMoviesError,
  selectMoviesStatus,
} from "../../features/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAllMovies } from "../../features/moviesSlice";

export const EditMovieForm = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectAllMovies);
  const status = useAppSelector(selectMoviesStatus);
  const error = useAppSelector(selectMoviesError);

  const handleDelete = async () => {
    if (selectedMovie) {
      dispatch(deleteMovie(selectedMovie.name));
    }
  };

  const handleEdit = async () => {
    if (selectedMovie) {
      dispatch(editMovie(selectedMovie));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMovie) {
      setSelectedMovie((prevState) => {
        if (prevState) {
          return { ...prevState, [e.target.name]: parseFloat(e.target.value) };
        }

        return prevState;
      });
    }
  };

  useEffect(() => {
    if (status === "succeeded" && !error) setSelectedMovie(null);
  }, [status, error]);

  return (
    <form className="flex flex-col gap-2">
      <select
        value={selectedMovie?.name || ""}
        onChange={(e) =>
          setSelectedMovie(() => {
            if (e.target.value === "") {
              return null;
            } else {
              return movies.filter((movie) => movie.name === e.target.value)[0];
            }
          })
        }
      >
        <option value="">...Select a movie!</option>;
        {movies.map((movie) => {
          return (
            <option value={movie.name} key={movie.id}>
              {movie.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="movieName">Name{error}</label>
      <input
        type="text"
        id="movieName"
        readOnly
        placeholder="Name of the movie"
        value={selectedMovie?.name || ""}
        className="bg-neutral-300 rounded-lg p-2 mb-4"
      />
      <label htmlFor="movieGenre">Genre</label>
      <input
        type="text"
        id="movieGenre"
        placeholder="Genre of the movie"
        value={selectedMovie?.genre || ""}
        className="bg-neutral-300 rounded-lg p-2 mb-4"
        onChange={handleChange}
      />
      <label htmlFor="moviePrice">Price</label>
      <input
        type="number"
        id="moviePrice"
        min={0.01}
        step={0.01}
        placeholder="Price of the movie"
        value={selectedMovie?.price || ""}
        className="bg-neutral-300 rounded-lg p-2 mb-4"
        onChange={handleChange}
      />
      <label htmlFor="movieStock">Stock</label>
      <input
        type="number"
        id="movieStock"
        min={0}
        step={1}
        placeholder="Movie's stock"
        value={selectedMovie ? selectedMovie?.stock || 0 : ""}
        className="bg-neutral-300 rounded-lg p-2 mb-4"
        name="stock"
        onChange={handleChange}
      />
      <div className="grid grid-cols-2 gap-2 h-10">
        <button
          className="bg-zinc-700 text-white"
          type="button"
          onClick={handleEdit}
          disabled={!selectedMovie}
        >
          Edit
        </button>
        <button
          className="bg-red-700 text-white"
          type="button"
          onClick={handleDelete}
          disabled={!selectedMovie}
        >
          Delete
        </button>
      </div>
    </form>
  );
};
