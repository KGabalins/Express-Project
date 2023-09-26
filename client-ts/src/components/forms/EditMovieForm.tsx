import { useContext, useState } from "react";
import { MovieContext, MovieType } from "../contexts/MovieContext";
import axiosInstance from "../configs/AxiosConfig";

export const EditMovieForm = () => {
  const { movies, refreshMovies } = useContext(MovieContext);
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitter = (e.nativeEvent as any).submitter;

    if (submitter.className === "okButton") {
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
    } else if (submitter.className === "noButton") {
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      />
      <label htmlFor="movieGenre">Genre</label>
      <input
        type="text"
        id="movieGenre"
        placeholder="Genre of the movie"
        value={selectedMovie?.genre || ""}
        onChange={(e) => {
          if (selectedMovie) {
            setSelectedMovie((prevState) => {
              if (prevState) {
                return { ...prevState, genre: e.target.value };
              }

              return null;
            });
          }
        }}
      />
      <label htmlFor="moviePrice">Price</label>
      <input
        type="number"
        id="moviePrice"
        min={0.01}
        step={0.01}
        placeholder="Price of the movie"
        value={selectedMovie?.price || ""}
        onChange={(e) => {
          if (selectedMovie) {
            setSelectedMovie((prevState) => {
              if (prevState) {
                return { ...prevState, price: parseFloat(e.target.value) };
              }

              return prevState;
            });
          }
        }}
      />
      <label htmlFor="movieStock">Stock</label>
      <input
        type="number"
        id="movieStock"
        min={0}
        step={1}
        placeholder="Movie's stock"
        value={selectedMovie ? selectedMovie?.stock || 0 : ""}
        onChange={(e) => {
          if (selectedMovie) {
            setSelectedMovie((prevState) => {
              if (prevState) {
                return { ...prevState, stock: parseInt(e.target.value) };
              }

              return prevState;
            });
          }
        }}
      />
      <div
        className="buttonDiv"
        style={
          !selectedMovie
            ? { pointerEvents: "none", userSelect: "none" }
            : { pointerEvents: "initial", userSelect: "initial" }
        }
      >
        <button className="okButton" type="submit">
          Edit
        </button>
        <button className="noButton" type="submit">
          Delete
        </button>
      </div>
    </form>
  );
};
