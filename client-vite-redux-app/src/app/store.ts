import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice";
import rentedMoviesReducer from "../features/rentedMoviesSlice";

export const store = configureStore({
  reducer: { movies: moviesReducer, rentedMovies: rentedMoviesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
