import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios from "axios";

export type RentedMovieType = {
  id: number;
  name: string;
  genre: string;
  time: number;
  price: number;
  renter: string;
};

interface RentedMovieState {
  rentedMovies: RentedMovieType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
}

const initialState: RentedMovieState = {
  rentedMovies: [],
  status: "idle",
  error: null,
};

export const fetchRentedMovies = createAsyncThunk(
  "rentedMovies/fetchRentedMovies",
  async () => {
    const response = await axios.get("/api/rentedMovies");
    return response.data.sort(
      (a: RentedMovieType, b: RentedMovieType) => a.id - b.id
    );
  }
);

export const removeRentedMovie = createAsyncThunk(
  "rentedMovies/removeRentedMovie",
  async (id: number) => {
    await axios.delete(`/api/rentedMovies/id/${id}`);

    const response = await axios.get("/api/rentedMovies");
    return response.data.sort(
      (a: RentedMovieType, b: RentedMovieType) => a.id - b.id
    );
  }
);

export const changeRentedMovieTime = createAsyncThunk(
  "rentedMovies/changeRentedMovieTime",
  async ({ id, method }: { id: number; method: "+" | "-" }) => {
    await axios.put(`api/rentedMovies/id/${id}`, { method });

    const response = await axios.get("/api/rentedMovies");
    return response.data.sort(
      (a: RentedMovieType, b: RentedMovieType) => a.id - b.id
    );
  }
);

export const rentedMoviesSlice = createSlice({
  name: "rentedMovies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRentedMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRentedMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rentedMovies = action.payload;
      })
      .addCase(fetchRentedMovies.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(removeRentedMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rentedMovies = action.payload;
      })
      .addCase(removeRentedMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeRentedMovie.rejected, (state, action) => {
        if (action.error.message) state.error = action.error.message;
      })
      .addCase(changeRentedMovieTime.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rentedMovies = action.payload;
      })
      .addCase(changeRentedMovieTime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeRentedMovieTime.rejected, (state, action) => {
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const selectAllRentedMovies = (state: RootState) =>
  state.rentedMovies.rentedMovies;

export default rentedMoviesSlice.reducer;
