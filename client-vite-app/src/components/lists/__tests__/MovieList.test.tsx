import { render, screen } from "@testing-library/react";
import { MovieList } from "../MovieList";
import { MovieContext, MovieType } from "../../contexts/MovieContext";

// vitest.mock("../contexts/MovieContext.tsx", async () => {
//   const actual = await vitest.importActual("../contexts/MovieContext.tsx")
//   return {
//     ...actual,
//   },});

const mockMovies: MovieType[] = [
  {
    id: 12345,
    name: "Mock Name",
    genre: "Mock Genre",
    price: 4.99,
    stock: 99,
  },
  {
    id: 12346,
    name: "Mock Name",
    genre: "Mock Genre",
    price: 3.99,
    stock: 29,
  },
];

describe("Movie list", () => {
  beforeEach(() => {
    render(
      <MovieContext.Provider
        value={{
          movies: mockMovies,
          setMovies: vitest.fn(),
          refreshMovies: vitest.fn(),
        }}
      >
        <MovieList />
      </MovieContext.Provider>
    );
  });

  test("renders correctly", () => {
    const nameElement = screen.getByText("Name");
    expect(nameElement).toBeInTheDocument();
    const genreElement = screen.getByText("Genre");
    expect(genreElement).toBeInTheDocument();
    const priceElement = screen.getByText("Price");
    expect(priceElement).toBeInTheDocument();
    const stockElement = screen.getByText("Stock");
    expect(stockElement).toBeInTheDocument();

    const movieItems = screen.getAllByRole("form");
    expect(movieItems.length).toBe(mockMovies.length);
  });
});
