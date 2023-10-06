import { useEffect, useState, useContext, createContext } from "react";
import { Outlet } from "react-router-dom";
import axiosInstance from "../configs/AxiosConfig";

export type MovieType = {
  id: number;
  name: string;
  genre: string;
  price: number;
  stock: number;
};

type MovieContextType = {
  movies: MovieType[];
  refreshMovies: () => void;
};

const MovieContext = createContext({} as MovieContextType);

const MovieContextProvider = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    axiosInstance
      .get(`/movies`)
      .then((response) => {
        setMovies(
          response.data.sort((a: MovieType, b: MovieType) => {
            return a.id - b.id;
          })
        );
      })
      .catch(() => {
        setMovies([]);
      });
  };

  return (
    <MovieContext.Provider value={{ movies, refreshMovies }}>
      <Outlet />
    </MovieContext.Provider>
  );
};

const useMovieContext = () => {
  return useContext(MovieContext);
};

export { MovieContextProvider, useMovieContext };
