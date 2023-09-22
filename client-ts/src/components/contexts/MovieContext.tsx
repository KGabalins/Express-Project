import { createContext } from "react";

export type MovieType = {
  id: number;
  name: string;
  genre: string;
  price: number;
  stock: number;
};

export type RentedMovieType = {
  time: number;
  renter: string;
} & Omit<MovieType, "stock">;

type MovieContextType = {
  movies: MovieType[];
  rentedMovies: RentedMovieType[];
  refreshMovies: () => void;
};

export const MovieContext = createContext({} as MovieContextType);
