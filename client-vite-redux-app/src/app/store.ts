import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice";
import rentedMoviesReducer from "../features/rentedMoviesSlice";
import usersReducer from "../features/usersSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    rentedMovies: rentedMoviesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
