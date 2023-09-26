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
        <p className="emptyMovieText">You haven't rented any movie yet. Go to the home page to rent some!</p>
      ) : (
        rentedMovies.map((rentedMovie) => {
          return <RentedMovieItem rentedMovie={rentedMovie} key={rentedMovie.id} />;
        })
      )}
    </div>
  );
};
