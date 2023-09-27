import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { MovieItem } from "../items/MovieItem";

export const MovieList = () => {
  const { movies } = useContext(MovieContext);

  return (
    <div>
      <div className="grid grid-cols-[repeat(3,2fr)_1fr_100px] mb-3 rounded-3xl">
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
