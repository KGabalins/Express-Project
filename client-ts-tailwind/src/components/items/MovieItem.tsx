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
    <form
      className="grid grid-cols-[repeat(3,2fr)_1fr_100px] rounded-3xl bg-neutral-300 mb-5"
      onSubmit={handleSubmit}
      key={movie.id}
    >
      <span className="m-5">{movie.name}</span>
      <span className="m-5">{movie.genre}</span>
      <span className="m-5">{movie.price}</span>
      <span className="flex items-center m-5">
        {movie.stock}
        {movie.stock > 0 ? (
          <img
            className="ml-2 w-5"
            alt="check"
            src={require("../icons/check.png")}
          />
        ) : (
          <img
            className="ml-2 w-5"
            alt="check"
            src={require("../icons/cross.png")}
          />
        )}
      </span>
      <button type="submit" className="bg-zinc-700 text-white font-bold">
        Rent
      </button>
    </form>
  );
};
