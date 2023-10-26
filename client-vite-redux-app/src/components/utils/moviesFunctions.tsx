import axios from "axios";
import { AddMovieType, MovieType } from "../contexts/MovieContext";

const addMovie = async (addMovieData: AddMovieType) => {
  try {
    await axios.post(`api/movies`, addMovieData);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      throw new Error(error.response.data[0].message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const editMovie = async (name: string, updateData: MovieType) => {
  try {
    await axios.put(`api/movies/${name}`, updateData);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      throw new Error(error.response.data[0].message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const deleteMovie = async (movieName: string) => {
  try {
    await axios.delete(`api/movies/${movieName}`);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      throw new Error(error.response.data[0].message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const rentMovie = async (movieName: string) => {
  try {
    await axios.post(`api/rentedMovies/${movieName}`);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export { addMovie, deleteMovie, rentMovie, editMovie };
