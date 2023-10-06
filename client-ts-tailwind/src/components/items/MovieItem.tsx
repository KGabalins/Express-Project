import {
  MovieType,
  rentMovie,
  useMovieContext,
} from "../contexts/MovieContext";
import { useRentedMovieContext } from "../contexts/RentedMoviesContext";

type MovieItemProps = {
  movie: MovieType;
};

export const MovieItem = ({ movie }: MovieItemProps) => {
  const { setMovies } = useMovieContext();
  const { setRentedMovies } = useRentedMovieContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await rentMovie(movie.name, setMovies, setRentedMovies);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form
      className="grid grid-rows-5 grid-cols-1 sm:grid sm:grid-cols-[repeat(3,2fr)_1fr_100px] sm:grid-rows-1 sm:rounded-full bg-neutral-300 mb-5"
      onSubmit={handleSubmit}
      key={movie.id}
    >
      <span className="text-center sm:text-left m-5">
        <span className="visible sm:hidden font-bold">Name: </span>
        {movie.name}
      </span>
      <span className="text-center sm:text-left m-5">
        <span className="visible sm:hidden font-bold">Genre: </span>
        {movie.genre}
      </span>
      <span className="text-center sm:text-left m-5">
        <span className="visible sm:hidden font-bold">Price: </span>
        {movie.price}
      </span>
      <span className="flex items-center justify-center sm:justify-normal m-5">
        <span className="visible sm:hidden font-bold mr-1">Stock: </span>
        {movie.stock}
        {movie.stock > 0 ? (
          <img
            className="ml-1 w-5"
            alt="check"
            src={require("../icons/check.png")}
          />
        ) : (
          <img
            className="ml-1 w-5"
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
