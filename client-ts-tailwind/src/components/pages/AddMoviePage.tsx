import { AddMovieForm } from "../forms/AddMovieForm";

export const AddMoviePage = () => {
  return (
    <div className="cardContainer">
      <div className="card">
        <h2 className="cardTitle">Add Movie</h2>
        <AddMovieForm />
      </div>
    </div>
  );
};
