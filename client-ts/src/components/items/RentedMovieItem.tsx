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
      }).catch((error: any) => {
        alert(error.response.data.message)
      });
  };

  return (
    <form className="movieItem" onSubmit={handleSubmit} key={rentedMovie.id}>
      <span>{rentedMovie.name}</span>
      <span>{rentedMovie.genre}</span>
      <span className="timeSpan">
        <button type="button" onClick={() => changeTimeHandler("-")}>
          &#8592;
        </button>
        <input type="text" value={rentedMovie.time} readOnly />
        <button type="button" onClick={() => changeTimeHandler("+")}>
          &#8594;
        </button>
      </span>
      <span>{rentedMovie.price}</span>
      <button type="submit" className="removeBtn">
        Remove
      </button>
    </form>
  );
};
