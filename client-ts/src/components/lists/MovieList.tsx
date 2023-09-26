import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { MovieItem } from "../items/MovieItem";

export const MovieList = () => {
  const { movies } = useContext(MovieContext);

  return (
    <div className="movieContainer">
      <div className="gridHeader">
        <span>Name</span>
        <span>Genre</span>
        <span>Price</span>
        <span>Stock</span>
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
