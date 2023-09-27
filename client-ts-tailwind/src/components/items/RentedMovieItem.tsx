import { useContext } from "react";
import axiosInstance from "../configs/AxiosConfig";
import { MovieContext, RentedMovieType } from "../contexts/MovieContext";

type RentedMovieItemProps = {
  rentedMovie: RentedMovieType;
};

export const RentedMovieItem = ({ rentedMovie }: RentedMovieItemProps) => {
  const { refreshMovies } = useContext(MovieContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .delete(`/rentedMovies/id/${rentedMovie.id}`)
      .then(() => {
        refreshMovies();
      })
      .catch((error: any) => {
        alert(error.response.data.message);
      });
  };

  const changeTimeHandler = (method: "+" | "-") => {
    axiosInstance
      .put(`/rentedMovies/id/${rentedMovie.id}`, { method })
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
      key={rentedMovie.id}
    >
      <span className="m-5">{rentedMovie.name}</span>
      <span className="m-5">{rentedMovie.genre}</span>
      <span className="flex items-center m-5">
        <button
          type="button"
          className="bg-zinc-700 text-white text-[14px] h-[100%] w-[25px]"
          onClick={() => changeTimeHandler("-")}
        >
          &#8592;
        </button>
        <input
          type="text"
          className="text-center w-[50px] h-[100%]"
          value={rentedMovie.time}
          readOnly
        />
        <button
          type="button"
          className="bg-zinc-700 text-white text-[14px] h-[100%] w-[25px]"
          onClick={() => changeTimeHandler("+")}
        >
          &#8594;
        </button>
      </span>
      <span className="m-5">{rentedMovie.price}</span>
      <button type="submit" className=" bg-red-700 text-white font-bold">
        Remove
      </button>
    </form>
  );
};
