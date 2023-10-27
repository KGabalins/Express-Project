import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios from "axios";

export type MovieType = {
  id: number;
  name: string;
  genre: string;
  price: number;
  stock: number;
};

type CreateMovieType = Omit<MovieType, "id">;

interface MoviesState {
  movies: MovieType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
}

const initialState: MoviesState = {
  movies: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("/api/movies");
  return response.data.sort((a: MovieType, b: MovieType) => a.id - b.id);
});

export const rentMovie = createAsyncThunk(
  "movies/rentMovies",
  async (name: string) => {
    await axios.post(`/api/rentedMovies/${name}`);
    const response = await axios.get("/api/movies");
    return response.data.sort((a: MovieType, b: MovieType) => a.id - b.id);
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData: CreateMovieType) => {
    await axios.post(`/api/movies`, movieData);
    const response = await axios.get("/api/movies");
    return response.data;
  }
);

export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async (movieData: MovieType) => {
    await axios.put(`/api/movies/${movieData.name}`, movieData);
    const response = await axios.get("/api/movies");
    return response.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (name: string) => {
    await axios.delete(`/api/movies/${name}`);
    const response = await axios.get("/api/movies");
    return response.data;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(rentMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.movies = action.payload;
      })
      .addCase(rentMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rentMovie.rejected, (state, action) => {
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(addMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMovie.rejected, (state) => {
        state.error = "Movie with this name already exists!";
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(editMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editMovie.rejected, (state) => {
        state.error = "Invalid movie data!";
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMovie.rejected, (state) => {
        state.error = "Movie doesn't exist!";
      });
  },
});

export const selectAllMovies = (state: RootState) => state.movies.movies;
export const selectMoviesStatus = (state: RootState) => state.movies.status;
export const selectMoviesError = (state: RootState) => state.movies.error;

export default moviesSlice.reducer;
