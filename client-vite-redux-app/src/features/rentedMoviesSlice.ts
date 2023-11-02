import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios from "axios";
import { userActions } from "./usersSlice";

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
  error: string;
}

const initialState: RentedMovieState = {
  rentedMovies: [],
  status: "idle",
  error: "",
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

export const removeRentedMovie = createAsyncThunk<
  RentedMovieType[],
  number,
  { rejectValue: string }
>("rentedMovies/removeRentedMovie", async (id: number, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/rentedMovies/id/${id}`);

    const response = await axios.get("/api/rentedMovies");
    return response.data.sort(
      (a: RentedMovieType, b: RentedMovieType) => a.id - b.id
    );
  } catch (error: any) {
    if (Array.isArray(error.response.data)) {
      return rejectWithValue(error.response.data[0].message);
    } else {
      return rejectWithValue(error.response.data.message);
    }
  }
});

export const changeRentedMovieTime = createAsyncThunk<
  RentedMovieType[],
  { id: number; method: "+" | "-" },
  { rejectValue: string }
>(
  "rentedMovies/changeRentedMovieTime",
  async ({ id, method }, { rejectWithValue }) => {
    try {
      await axios.put(`api/rentedMovies/id/${id}`, { method });

      const response = await axios.get("/api/rentedMovies");
      return response.data.sort(
        (a: RentedMovieType, b: RentedMovieType) => a.id - b.id
      );
    } catch (error: any) {
      if (Array.isArray(error.response.data)) {
        return rejectWithValue(error.response.data[0].message);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
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
      .addCase(fetchRentedMovies.rejected, (state) => {
        state.status = "failed";
        state.error = "Only logged in users can access this page!";
      })
      .addCase(removeRentedMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rentedMovies = action.payload;
      })
      .addCase(removeRentedMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeRentedMovie.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(changeRentedMovieTime.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rentedMovies = action.payload;
      })
      .addCase(changeRentedMovieTime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeRentedMovieTime.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(userActions.clearAllErrors, (state) => {
        state.error = "";
      });
  },
});

export const selectAllRentedMovies = (state: RootState) =>
  state.rentedMovies.rentedMovies;
export const selectRentedMoviesStatus = (state: RootState) =>
  state.rentedMovies.status;
export const selectRentedMoviesError = (state: RootState) =>
  state.rentedMovies.error;

export default rentedMoviesSlice.reducer;
