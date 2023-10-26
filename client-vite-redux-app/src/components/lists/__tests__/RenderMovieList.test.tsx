import { render, screen } from "@testing-library/react";
import {
  RentedMovieContext,
  RentedMovieType,
} from "../../contexts/RentedMoviesContext";
import { RentedMoviesList } from "../RentedMoviesList";

const mockMovies: RentedMovieType[] = [
  {
    id: 12345,
    name: "Mock Name",
    genre: "Mock Genre",
    price: 4.99,
    time: 12,
    renter: "mock@example.com",
  },
  {
    id: 12346,
    name: "Mock Name",
    genre: "Mock Genre",
    price: 3.99,
    time: 12,
    renter: "mock@example.com",
  },
];

describe("Movie list", () => {
  beforeEach(() => {
    render(
      <RentedMovieContext.Provider
        value={{
          rentedMovies: mockMovies,
          setRentedMovies: vitest.fn(),
          refreshRentedMovies: vitest.fn(),
        }}
      >
        <RentedMoviesList />
      </RentedMovieContext.Provider>
    );
  });

  test("renders correctly", () => {
    const nameElement = screen.getByText("Name");
    expect(nameElement).toBeInTheDocument();
    const genreElement = screen.getByText("Genre");
    expect(genreElement).toBeInTheDocument();
    const priceElement = screen.getByText("Price");
    expect(priceElement).toBeInTheDocument();
    const timeElements = screen.getByText("Time");
    expect(timeElements).toBeInTheDocument();

    const movieItems = screen.getAllByRole("form");
    expect(movieItems.length).toBe(mockMovies.length);
  });
});
