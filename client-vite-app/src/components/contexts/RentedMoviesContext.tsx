import { createContext, useEffect, useState } from "react";
import axios from "axios";
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
  setRentedMovies: React.Dispatch<React.SetStateAction<RentedMovieType[]>>;
  refreshRentedMovies: () => void;
};

export const RentedMovieContext = createContext({} as RentedMovieContextType);

const RentedMovieContextProvider = () => {
  const [rentedMovies, setRentedMovies] = useState<RentedMovieType[]>([]);

  useEffect(() => {
    refreshRentedMovies();
  }, []);

  const refreshRentedMovies = () => {
    axios
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
  };

  return (
    <RentedMovieContext.Provider
      value={{ rentedMovies, setRentedMovies, refreshRentedMovies }}
    >
      <Outlet />
    </RentedMovieContext.Provider>
  );
};

export { RentedMovieContextProvider };
