import { MovieList } from "../lists/MovieList";

export const HomePage = () => {
  return (
    <div className="page">
      <h2 className="text-2xl text-center font-bold mb-10">Available Movies</h2>
      <MovieList />
    </div>
  );
};
