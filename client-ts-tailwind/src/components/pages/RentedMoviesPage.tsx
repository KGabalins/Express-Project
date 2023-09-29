import { RentedMoviesList } from "../lists/RentedMoviesList";

export const RentedMoviesPage = () => {
  return (
    <div className="page">
      <h2 className="text-2xl text-center font-bold mb-10">Rented Movies</h2>
      <RentedMoviesList />
    </div>
  );
};
