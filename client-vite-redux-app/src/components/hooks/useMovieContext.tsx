import { MovieContext } from "../contexts/MovieContext";
import { useContext } from "react";

const useMovieContext = () => {
  return useContext(MovieContext);
};

export default useMovieContext;
