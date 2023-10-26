import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchRentedMovies,
  selectAllRentedMovies,
} from "../../features/rentedMoviesSlice";
import { RentedMovieItem } from "../items/RentedMovieItem";
import { useEffect } from "react";

export const RentedMoviesList = () => {
  const rentedMovies = useAppSelector(selectAllRentedMovies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRentedMovies());
  }, [dispatch]);

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
