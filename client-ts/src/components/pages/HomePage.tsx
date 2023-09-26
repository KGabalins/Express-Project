import "../styles/Movies.css";
import { MovieList } from "../lists/MovieList";

export const HomePage = () => {
  return (
    <div className="page">
      <h2 className="pageTitle">Available Movies</h2>
      <MovieList />
    </div>
  );
};
