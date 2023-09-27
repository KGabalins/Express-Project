import { useEffect, useState } from "react";
import { MovieContext, MovieType, RentedMovieType } from "./MovieContext";
import { Outlet } from "react-router-dom";
import axiosInstance from "../configs/AxiosConfig";

export const MovieContextProvider = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [rentedMovies, setRentedMovies] = useState<RentedMovieType[]>([]);

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

    axiosInstance
      .get(`/rentedMovies`)
      .then((response) => {
        setRentedMovies(
          response.data.sort((a: MovieType, b: MovieType) => {
            return a.id - b.id;
          })
        );
      })
      .catch(() => {
        setRentedMovies([]);
      });
  };

  return (
    <MovieContext.Provider value={{ movies, refreshMovies, rentedMovies }}>
      <Outlet />
    </MovieContext.Provider>
  );
};
