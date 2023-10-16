import { useEffect, useState, useContext, createContext } from "react";
import { Outlet } from "react-router-dom";
import axiosInstance from "../configs/AxiosConfig";
import { RentedMovieType, refreshRentedMovies } from "./RentedMoviesContext";

export type MovieType = {
  id: number;
  name: string;
  genre: string;
  price: number;
  stock: number;
};

type AddMovieType = Omit<MovieType, "id">;

type MovieContextType = {
  movies: MovieType[];
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>;
};

const MovieContext = createContext({} as MovieContextType);

const MovieContextProvider = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`api/movies`)
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
  }, []);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      <Outlet />
    </MovieContext.Provider>
  );
};

const refreshMovies = async (
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>
) => {
  try {
    const response = await axiosInstance.get(`api/movies`);
    setMovies(
      response.data.sort((a: MovieType, b: MovieType) => {
        return a.id - b.id;
      })
    );
  } catch (error) {
    setMovies([]);
  }
};

const addMovie = async (
  addMovieData: AddMovieType,
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>
) => {
  try {
    await axiosInstance.post(`api/movies`, addMovieData);
    await refreshMovies(setMovies);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      throw new Error(error.response.data[0].message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const editMovie = async (
  name: string,
  updateData: MovieType,
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>
) => {
  try {
    await axiosInstance.put(`api/movies/${name}`, updateData);
    await refreshMovies(setMovies);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      throw new Error(error.response.data[0].message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const deleteMovie = async (
  movieName: string,
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>
) => {
  try {
    await axiosInstance.delete(`api/movies/${movieName}`);
    await refreshMovies(setMovies);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      throw new Error(error.response.data[0].message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const rentMovie = async (
  movieName: string,
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>,
  setRentedMovies: React.Dispatch<React.SetStateAction<RentedMovieType[]>>
) => {
  try {
    await axiosInstance.post(`api/rentedMovies/${movieName}`);
    await refreshMovies(setMovies);
    await refreshRentedMovies(setRentedMovies);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const useMovieContext = () => {
  return useContext(MovieContext);
};

export {
  MovieContextProvider,
  useMovieContext,
  addMovie,
  deleteMovie,
  rentMovie,
  refreshMovies,
  editMovie,
};
