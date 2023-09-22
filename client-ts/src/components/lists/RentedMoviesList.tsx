import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { RentedMovieItem } from "../items/RentedMovieItem";

export const RentedMoviesList = () => {
  const { rentedMovies } = useContext(MovieContext);

  return (
    <div className="movieContainer">
      <div className="gridHeader">
        <span>Name</span>
        <span>Genre</span>
        <span>Time</span>
        <span>Price</span>
      </div>
      {rentedMovies.length === 0 ? (
        <p>No available movie for now!</p>
      ) : (
        rentedMovies.map((rentedMovie) => {
          return <RentedMovieItem rentedMovie={rentedMovie} />;
        })
      )}
    </div>
  );
};
