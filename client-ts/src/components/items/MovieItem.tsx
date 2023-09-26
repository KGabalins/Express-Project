import { useContext } from "react";
import axiosInstance from "../configs/AxiosConfig";
import { MovieContext, MovieType } from "../contexts/MovieContext";

type MovieItemProps = {
  movie: MovieType;
};

export const MovieItem = ({ movie }: MovieItemProps) => {
  const { refreshMovies } = useContext(MovieContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .post(`/rentedMovies/${movie.name}`)
      .then(() => {
        refreshMovies();
      })
      .catch((error: any) => {
        alert(error.response.data.message);
      });
  };

  return (
    <form className="movieItem" onSubmit={handleSubmit} key={movie.id}>
      <span>{movie.name}</span>
      <span>{movie.genre}</span>
      <span>{movie.price}</span>
      <span className="stockSpan">
        {movie.stock}{" "}
        {movie.stock > 0 ? (
          <img alt="check" src={require("../icons/check.png")} />
        ) : (
          <img alt="check" src={require("../icons/cross.png")} />
        )}
      </span>
      <button type="submit" className="rentBtn">Rent</button>
    </form>
  );
};
