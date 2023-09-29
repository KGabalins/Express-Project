import { EditMovieForm } from "../forms/EditMovieForm";

export const EditMoviePage = () => {
  return (
    <div className="cardContainer">
      <div className="card">
        <h2 className="text-center text-xl font-bold mb-2">Edit Movie</h2>
        <EditMovieForm />
      </div>
    </div>
  );
};
