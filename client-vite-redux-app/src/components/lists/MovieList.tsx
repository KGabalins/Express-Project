import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MovieItem } from "../items/MovieItem";
import {
  fetchMovies,
  selectAllMovies,
  selectMoviesError,
} from "../../features/moviesSlice";

export const MovieList = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectAllMovies);
  const error = useAppSelector(selectMoviesError);

  if (error) console.log(error);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      <div className="sm:grid grid-cols-[repeat(3,2fr)_1fr_100px] mb-3 rounded-3xl hidden sm:visible">
        <span className="ml-5">Name</span>
        <span className="ml-5">Genre</span>
        <span className="ml-5">Price</span>
        <span className="ml-5">Stock</span>
      </div>
      {movies.length === 0 ? (
        <p>No available movie for now!</p>
      ) : (
        movies.map((movie) => {
          return <MovieItem movie={movie} key={movie.id} />;
        })
      )}
    </div>
  );
};
