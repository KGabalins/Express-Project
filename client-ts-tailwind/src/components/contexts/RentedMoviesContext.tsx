import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../configs/AxiosConfig";
import { Outlet } from "react-router-dom";

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
  refreshRentedMovies: () => void;
};

const RentedMovieContext = createContext({} as RentedMovieContextType);

const RentedMovieContextProvider = () => {
  const [rentedMovies, setRentedMovies] = useState<RentedMovieType[]>([]);

  useEffect(() => {
    refreshRentedMovies();
  }, []);

  const refreshRentedMovies = () => {
    axiosInstance
      .get(`/rentedMovies`)
      .then((response) => {
        console.log(response);
        setRentedMovies(
          response.data.sort((a: RentedMovieType, b: RentedMovieType) => {
            return a.id - b.id;
          })
        );
      })
      .catch(() => {
        setRentedMovies([]);
      });
  };

  return (
    <RentedMovieContext.Provider value={{ rentedMovies, refreshRentedMovies }}>
      <Outlet />
    </RentedMovieContext.Provider>
  );
};

const useRentedMovieContext = () => {
  return useContext(RentedMovieContext);
};

export { RentedMovieContextProvider, useRentedMovieContext };
