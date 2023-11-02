import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios from "axios";
import { userActions } from "./usersSlice";

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
  error: string;
}

const initialState: MoviesState = {
  movies: [],
  status: "idle",
  error: "",
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("/api/movies");
  return response.data.sort((a: MovieType, b: MovieType) => a.id - b.id);
});

export const rentMovie = createAsyncThunk<
  MovieType[],
  string,
  { rejectValue: string }
>("movies/rentMovies", async (name: string, { rejectWithValue }) => {
  try {
    await axios.post(`/api/rentedMovies/${name}`);
    const response = await axios.get("/api/movies");
    return response.data.sort((a: MovieType, b: MovieType) => a.id - b.id);
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      return rejectWithValue(error.response.data[0].message);
    } else {
      return rejectWithValue(error.response.data.message);
    }
  }
});

export const addMovie = createAsyncThunk<
  MovieType[],
  CreateMovieType,
  { rejectValue: string }
>(
  "movies/addMovie",
  async (movieData: CreateMovieType, { rejectWithValue }) => {
    try {
      await axios.post(`/api/movies`, movieData);
      const response = await axios.get("/api/movies");
      return response.data;
    } catch (error: any) {
      if (Array.isArray(error.response.data)) {
        return rejectWithValue(error.response.data[0].message);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const editMovie = createAsyncThunk<
  MovieType[],
  MovieType,
  { rejectValue: string }
>("movies/editMovie", async (movieData: MovieType, { rejectWithValue }) => {
  try {
    await axios.put(`/api/movies/${movieData.name}`, movieData);
    const response = await axios.get("/api/movies");
    return response.data;
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      return rejectWithValue(error.response.data[0].message);
    } else {
      return rejectWithValue(error.response.data.message);
    }
  }
});

export const deleteMovie = createAsyncThunk<
  MovieType[],
  string,
  { rejectValue: string }
>("movies/deleteMovie", async (name: string, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/movies/${name}`);
    const response = await axios.get("/api/movies");
    return response.data;
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      return rejectWithValue(error.response.data[0].message);
    } else {
      return rejectWithValue(error.response.data.message);
    }
  }
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
        state.error = "Only logged in users can access this page!";
      })
      .addCase(rentMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.movies = action.payload;
      })
      .addCase(rentMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rentMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(addMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(editMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(userActions.clearAllErrors, (state) => {
        state.error = "";
      });
  },
});

export const selectAllMovies = (state: RootState) => state.movies.movies;
export const selectMoviesStatus = (state: RootState) => state.movies.status;
export const selectMoviesError = (state: RootState) => state.movies.error;

export default moviesSlice.reducer;
