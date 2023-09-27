import { RentedMoviesList } from "../lists/RentedMoviesList";

export const RentedMoviesPage = () => {
  return (
    <div className="bg-white rounded-3xl my-5 p-10">
      <h2 className="text-2xl text-center font-bold mb-5">Rented Movies</h2>
      <RentedMoviesList />
    </div>
  );
};
