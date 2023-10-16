import { useState } from "react";
import { MovieType, deleteMovie, editMovie } from "../contexts/MovieContext";
import { useMovieContext } from "../contexts/MovieContext";

export const EditMovieForm = () => {
  const { movies, setMovies } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    if (selectedMovie) {
      try {
        await deleteMovie(selectedMovie?.name, setMovies);
        setSelectedMovie(null);
        setErrorMessage("");
        setSuccessMessage("Movie deleted successfully!");
      } catch (error: any) {
        setSuccessMessage("");
        setErrorMessage(error.message);
      }
    }
  };

  const handleEdit = async () => {
    if (selectedMovie) {
      try {
        await editMovie(selectedMovie.name, selectedMovie, setMovies);
        setErrorMessage("");
        setSuccessMessage("Movie updated successfully!");
      } catch (error: any) {
        setSuccessMessage("");
        setErrorMessage(error.message);
      }
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

  return (
    <form className="flex flex-col gap-2">
      <select
        value={selectedMovie?.name || ""}
        onChange={(e) =>
          setSelectedMovie(() => {
            setSuccessMessage("");
            setErrorMessage("");
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
      <label htmlFor="movieName">
        Name{" "}
        {successMessage && (
          <span className="successText">{` - ${successMessage}`}</span>
        )}{" "}
        {errorMessage && (
          <span className="errorText">{` - ${errorMessage}`}</span>
        )}
      </label>
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
        >
          Edit
        </button>
        <button
          className="bg-red-700 text-white"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </form>
  );
};
