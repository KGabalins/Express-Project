import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

export type MovieType = {
  id: number;
  name: string;
  genre: string;
  price: number;
  stock: number;
};

export type AddMovieType = Omit<MovieType, "id">;

type MovieContextType = {
  movies: MovieType[];
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>;
  refreshMovies: () => void;
};

export const MovieContext = createContext({} as MovieContextType);

const MovieContextProvider = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(`api/movies`, { cancelToken: source.token })
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

    return () => {
      source.cancel();
    };
  }, []);

  const refreshMovies = () => {
    axios
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
  };

  return (
    <MovieContext.Provider value={{ movies, setMovies, refreshMovies }}>
      <Outlet />
    </MovieContext.Provider>
  );
};

export { MovieContextProvider };
