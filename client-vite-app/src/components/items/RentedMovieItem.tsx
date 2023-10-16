import { useMovieContext } from "../contexts/MovieContext";
import {
  RentedMovieType,
  changeRentedMovieTime,
  removeRentedMovie,
  useRentedMovieContext,
} from "../contexts/RentedMoviesContext";

type RentedMovieItemProps = {
  rentedMovie: RentedMovieType;
};

export const RentedMovieItem = ({ rentedMovie }: RentedMovieItemProps) => {
  const { setRentedMovies } = useRentedMovieContext();
  const { setMovies } = useMovieContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await removeRentedMovie(rentedMovie.id, setMovies, setRentedMovies);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const changeTimeHandler = async (method: "+" | "-") => {
    try {
      changeRentedMovieTime(rentedMovie.id, method, setRentedMovies);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form
      className="grid grid-rows-5 grid-cols-1 sm:grid sm:grid-cols-[repeat(3,2fr)_1fr_100px] sm:grid-rows-1 sm:rounded-full bg-neutral-300 mb-5"
      onSubmit={handleSubmit}
      key={rentedMovie.id}
    >
      <span className="text-center sm:text-left m-5">
        <span className="visible sm:hidden font-bold">Name: </span>
        {rentedMovie.name}
      </span>
      <span className="text-center sm:text-left m-5">
        <span className="visible sm:hidden font-bold">Genre: </span>
        {rentedMovie.genre}
      </span>
      <span className="flex items-center justify-center sm:justify-normal m-5">
        <span className="visible sm:hidden font-bold mr-1">Time: </span>
        <button
          type="button"
          className="bg-zinc-700 flex justify-center items-center text-white w-[25px]"
          onClick={() => changeTimeHandler("-")}
        >
          &#8592;
        </button>
        <input
          type="text"
          className="text-center w-[50px]"
          value={rentedMovie.time}
          readOnly
        />
        <button
          type="button"
          className="bg-zinc-700 flex justify-center items-center text-white w-[25px]"
          onClick={() => changeTimeHandler("+")}
        >
          &#8594;
        </button>
      </span>
      <span className="flex items-center justify-center sm:justify-normal m-5">
        <span className="visible sm:hidden font-bold mr-1">Price: </span>
        {rentedMovie.price}
      </span>
      <button type="submit" className=" bg-red-700 text-white font-bold">
        Remove
      </button>
    </form>
  );
};
