import { useState } from "react";
import { MovieType } from "../contexts/MovieContext";
import axiosInstance from "../configs/AxiosConfig";
import { useMovieContext } from "../contexts/MovieContext";

export const EditMovieForm = () => {
  const { movies, refreshMovies } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleDelete = () => {
    axiosInstance
      .delete(`/movies/${selectedMovie?.name}`)
      .then(() => {
        setSelectedMovie(null);
        setError("");
        setSuccess("Movie deleted successfully!");
        refreshMovies();
      })
      .catch((error: any) => {
        if (Array.isArray(error.response.data)) {
          setError(error.response.data[0].message);
        } else {
          setError(error.response.data.message);
        }
      });
  };

  const handleEdit = () => {
    axiosInstance
      .put(`/movies/${selectedMovie?.name}`, selectedMovie)
      .then(() => {
        setSelectedMovie(null);
        setError("");
        setSuccess("Movie updated successfully!");
        refreshMovies();
      })
      .catch((error: any) => {
        if (Array.isArray(error.response.data)) {
          setError(error.response.data[0].message);
        } else {
          setError(error.response.data.message);
        }
      });
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
            setSuccess("");
            setError("");
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
        Name {success && <span className="successText">{` - ${success}`}</span>}{" "}
        {error && <span className="errorText">{` - ${error}`}</span>}
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
