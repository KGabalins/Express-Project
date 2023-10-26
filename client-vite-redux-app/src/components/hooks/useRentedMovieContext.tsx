import { useContext } from "react";
import { RentedMovieContext } from "../contexts/RentedMoviesContext";

const useRentedMovieContext = () => {
  return useContext(RentedMovieContext);
};

export default useRentedMovieContext;
