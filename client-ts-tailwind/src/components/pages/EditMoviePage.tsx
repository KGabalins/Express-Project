import { EditMovieForm } from "../forms/EditMovieForm";

export const EditMoviePage = () => {
  return (
    <div className="cardContainer">
      <div className="card">
        <h2 className="cardTitle">Edit Movie</h2>
        <EditMovieForm />
      </div>
    </div>
  );
};
