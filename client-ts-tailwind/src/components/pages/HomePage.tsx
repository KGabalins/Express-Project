import { MovieList } from "../lists/MovieList";

export const HomePage = () => {
  return (
    <div className="bg-white rounded-3xl my-5 p-10">
      <h2 className="text-2xl text-center font-bold mb-5">Available Movies</h2>
      <MovieList />
    </div>
  );
};
