import { RentedMoviesList } from "../lists/RentedMoviesList";
import "../styles/Movies.css"

export const RentedMoviesPage = () => {
  return (
    <div className="page">
      <h2 className="pageTitle">Rented Movies</h2>
      <RentedMoviesList />
    </div>
  );
};
