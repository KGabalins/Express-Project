import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../configs/AxiosConfig";
import { Outlet } from "react-router-dom";
import { MovieType, refreshMovies } from "./MovieContext";

export type RentedMovieType = {
  id: number;
  name: string;
  genre: string;
  time: number;
  price: number;
  renter: string;
};

type RentedMovieContextType = {
  rentedMovies: RentedMovieType[];
  setRentedMovies: React.Dispatch<React.SetStateAction<RentedMovieType[]>>;
};

const RentedMovieContext = createContext({} as RentedMovieContextType);

const RentedMovieContextProvider = () => {
  const [rentedMovies, setRentedMovies] = useState<RentedMovieType[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`api/rentedMovies`)
      .then((response) => {
        setRentedMovies(
          response.data.sort((a: RentedMovieType, b: RentedMovieType) => {
            return a.id - b.id;
          })
        );
      })
      .catch(() => {
        setRentedMovies([]);
      });
  }, []);

  return (
    <RentedMovieContext.Provider value={{ rentedMovies, setRentedMovies }}>
      <Outlet />
    </RentedMovieContext.Provider>
  );
};

const useRentedMovieContext = () => {
  return useContext(RentedMovieContext);
};

const refreshRentedMovies = async (
  setRentedMovies: React.Dispatch<React.SetStateAction<RentedMovieType[]>>
) => {
  try {
    const response = await axiosInstance.get(`api/rentedMovies`);
    setRentedMovies(
      response.data.sort((a: RentedMovieType, b: RentedMovieType) => {
        return a.id - b.id;
      })
    );
  } catch (error) {
    setRentedMovies([]);
  }
};

const removeRentedMovie = async (
  id: number,
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>,
  setRentedMovies: React.Dispatch<React.SetStateAction<RentedMovieType[]>>
) => {
  try {
    await axiosInstance.delete(`api/rentedMovies/id/${id}`);
    refreshRentedMovies(setRentedMovies);
    refreshMovies(setMovies);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const changeRentedMovieTime = async (
  id: number,
  method: "+" | "-",
  setRentedMovies: React.Dispatch<React.SetStateAction<RentedMovieType[]>>
) => {
  try {
    await axiosInstance.put(`api/rentedMovies/id/${id}`, { method });
    refreshRentedMovies(setRentedMovies);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export {
  RentedMovieContextProvider,
  useRentedMovieContext,
  refreshRentedMovies,
  removeRentedMovie,
  changeRentedMovieTime,
};
