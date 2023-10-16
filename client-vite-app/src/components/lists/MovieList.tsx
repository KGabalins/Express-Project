import { useMovieContext } from "../contexts/MovieContext";
import { MovieItem } from "../items/MovieItem";

export const MovieList = () => {
  const { movies } = useMovieContext();

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
