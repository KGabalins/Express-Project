import useRentedMovieContext from "../hooks/useRentedMovieContext";
import { RentedMovieItem } from "../items/RentedMovieItem";

export const RentedMoviesList = () => {
  const { rentedMovies } = useRentedMovieContext();

  return (
    <div>
      <div className="sm:grid grid-cols-[repeat(3,2fr)_1fr_100px] mb-3 rounded-3xl hidden sm:visible">
        <span className="ml-5">Name</span>
        <span className="ml-5">Genre</span>
        <span className="ml-5">Time</span>
        <span className="ml-5">Price</span>
      </div>
      {rentedMovies.length === 0 ? (
        <p className="emptyMovieText">
          You haven't rented any movie yet. Go to the home page to rent some!
        </p>
      ) : (
        rentedMovies.map((rentedMovie) => {
          return (
            <RentedMovieItem rentedMovie={rentedMovie} key={rentedMovie.id} />
          );
        })
      )}
    </div>
  );
};
